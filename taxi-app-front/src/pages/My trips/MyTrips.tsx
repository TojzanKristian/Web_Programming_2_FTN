import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStyleMT, tableStyleMT, tdStyleMT } from './MyTripsCSS'
import TripService from '../../services/Trip/TripService';

const MyTrips: React.FC = () => {

    const redirection = useNavigate();
    const [trips, setTrips] = useState<any[]>([]);

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za prijem mojih prethodnih vožnji sa servera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TripService.getMyTrips();
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
            <h1 style={titleStyleMT}>Vaše prethodne vožnje</h1>
            <table className="table table-dark table-hover" style={tableStyleMT}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Putnik :</th>
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
                            <td style={tdStyleMT}>{trip.passenger}</td>
                            <td style={tdStyleMT}>{trip.startingAddress}</td>
                            <td style={tdStyleMT}>{trip.finalAddress}</td>
                            <td style={tdStyleMT}>{trip.durationOfTheTrip.replace('min', '')}</td>
                            <td style={tdStyleMT}>{trip.priceOfTheTrip.replace('din', '')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTrips;