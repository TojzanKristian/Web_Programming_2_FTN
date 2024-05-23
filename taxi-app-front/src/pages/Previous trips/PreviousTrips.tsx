import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStylePT, tableStylePT, tdStylePT } from './PreviousTripsCSS'
import TripService from '../../services/Trip/TripService';
import NavBarPreviousTrips from '../components/NavBar/NavBarPreviousTrips';

const PreviousTrips: React.FC = () => {

    const redirection = useNavigate();
    const [trips, setTrips] = useState<any[]>([]);

    // Funkcija za zaštitu stranice i prijem prethodnih vožnji sa servera
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }

        const fetchData = async () => {
            try {
                const response = await TripService.getPassengersTrips();
                setTrips(response);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavBarPreviousTrips />
            <h1 style={titleStylePT}>Vaše prethodne vožnje</h1>
            <table className="table table-dark table-hover" style={tableStylePT}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Početna adresa :</th>
                        <th scope="col">Krajnja adresa :</th>
                        <th scope="col">Vremensko trajanje (min) :</th>
                        <th scope="col">Cena (din) :</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td style={tdStylePT}>{trip.startingAddress}</td>
                            <td style={tdStylePT}>{trip.finalAddress}</td>
                            <td style={tdStylePT}>{trip.durationOfTheTrip.replace('min', '')}</td>
                            <td style={tdStylePT}>{trip.priceOfTheTrip.replace('din', '')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PreviousTrips;