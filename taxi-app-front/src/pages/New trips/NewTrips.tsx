import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStyleNT, tableStyleNT, tdStyleNT } from './NewTripsCSS'
import NewTripService from '../../services/New trip/NewTripService';
import CountdownTimerModal from '../components/Countdown timer/CountdownTimerModal';

const NewTrips: React.FC = () => {

    const redirection = useNavigate();
    const [trips, setTrips] = useState<any[]>([]);
    const [startTimer, setStartTimer] = useState(false);
    const [timerDuration, setTimerDuration] = useState(0);
    const [showTimerModal, setShowTimerModal] = useState(false);

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za prijem aktivnih vožnji sa servera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await NewTripService.getActiceTrips();
                setTrips(response);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function wait(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const takeTheTrip = async (trip: any) => {
        try {
            const response = await NewTripService.acceptanceOfTrip(trip);
            console.log(response)

            const tripDataString = localStorage.getItem('tripData');
            if (tripDataString) {
                const tripData = JSON.parse(tripDataString);
                tripData.state = 'Aktivan';
                localStorage.setItem('tripData', JSON.stringify(tripData));
            }

            const durationInMinutes = parseInt(trip.durationOfTheTrip.replace('min', ''));
            setTimerDuration(durationInMinutes);
            setStartTimer(true);
            setShowTimerModal(true);

            await wait(durationInMinutes * 60 * 1000);
            window.location.reload();
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    return (
        <div>
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