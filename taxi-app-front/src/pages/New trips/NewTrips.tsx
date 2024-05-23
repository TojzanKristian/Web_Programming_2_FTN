import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStyleNT, tableStyleNT, tdStyleNT } from './NewTripsCSS'
import TripService from '../../services/Trip/TripService';
import CountdownTimerModal from '../components/Countdown timer/CountdownTimerModal';
import NavbarNewTrips from '../components/NavBar/NavBarNewTrips';

const NewTrips: React.FC = () => {

    const redirection = useNavigate();
    const [trips, setTrips] = useState<any[]>([]);
    const [timerDuration, setTimerDuration] = useState(0);
    const [showTimerModal, setShowTimerModal] = useState<boolean>(false);

    // Funkcija za zaštitu stranice i prijem aktivnih vožnji sa servera
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await TripService.getActiceTrips();
                if (response.message === '3') {
                    redirection('/dashboard-driver');
                    return;
                }
                else if (response.message === '2') {
                    redirection('/dashboard-driver');
                    return;
                }
                else if (response.message === '1') {
                    setTrips(response.data);
                }
                else {
                    console.log('Došlo je do greške!');
                    redirection('/dashboard-driver');
                }
            } catch (error) {
                redirection('/dashboard-driver');
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija koja zaustavlja izvršavanje dok tajmer ne istekne
    function wait(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Funkcija za prihvatanje vožnje
    const takeTheTrip = async (trip: any) => {
        try {
            const response = await TripService.acceptanceOfTrip(trip);
            if (response.message === "1") {
                const timeForTheTaxiToArriveNumber = parseFloat(response.timeForTheTaxiToArrive);
                const timeForTheTaxiToArriveInt = Math.round(timeForTheTaxiToArriveNumber);
                const durationInMinutes = parseInt(trip.durationOfTheTrip.replace('min', ''));
                setTimerDuration(timeForTheTaxiToArriveInt + durationInMinutes);
                setShowTimerModal(true);

                await wait(((timeForTheTaxiToArriveInt + durationInMinutes) * 60 * 1000) + 7500);
                const result = await TripService.theTripHasEnded(trip);
                if (result.message === "1") {
                    alert('Vožnja je završena!');
                    window.location.reload();
                }
                else {
                    alert('Došlo je do greške!');
                    window.location.reload();
                }
            }
            else {
                alert('Došlo je do greške!');
            }
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    return (
        <div>
            <NavbarNewTrips />
            <h1 style={titleStyleNT}>Trenutno aktivne vožnje</h1>
            <table className="table table-dark table-hover" style={tableStyleNT}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Putnik :</th>
                        <th scope="col">Početna adresa :</th>
                        <th scope="col">Krajnja adresa :</th>
                        <th scope="col">Vremensko trajanje (min) :</th>
                        <th scope="col">Cena (din) :</th>
                        <th scope="col">Prihvati :</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip, index) => (
                        <tr key={index}>
                            <td style={tdStyleNT}>{index + 1}</td>
                            <td style={tdStyleNT}>{trip.passenger}</td>
                            <td style={tdStyleNT}>{trip.startingAddress}</td>
                            <td style={tdStyleNT}>{trip.finalAddress}</td>
                            <td style={tdStyleNT}>{trip.durationOfTheTrip.replace('min', '')}</td>
                            <td style={tdStyleNT}>{trip.priceOfTheTrip.replace('din', '')}</td>
                            <td><button className="btn btn-outline-light" onClick={() => takeTheTrip(trip)}>Prihvati</button></td>
                        </tr>
                    ))}
                </tbody>
                <CountdownTimerModal
                    show={showTimerModal}
                    onHide={() => setShowTimerModal(false)}
                    title={'Odbrojavanje'}
                    initialMinutes={timerDuration}
                />
            </table>
        </div>
    );
};

export default NewTrips;