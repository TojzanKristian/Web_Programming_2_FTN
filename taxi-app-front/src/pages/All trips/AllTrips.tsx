import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStyleAT, tableStyleAT, tdStyleAT } from './AllTripsCSS'
import NewTripService from '../../services/New trip/NewTripService';

const AllTrips: React.FC = () => {

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
                const response = await NewTripService.getAllTrips();
                setTrips(response); // Válasz beállítása a trips állapotba
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1 style={titleStyleAT}>Sve vožnje u sistemu</h1>
            <table className="table table-dark table-hover" style={tableStyleAT}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vozač :</th>
                        <th scope="col">Putnik :</th>
                        <th scope="col">Početna adresa :</th>
                        <th scope="col">Krajnja adresa :</th>
                        <th scope="col">Vremensko trajanje (min) :</th>
                        <th scope="col">Cena (din) :</th>
                        <th scope="col">Status :</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td style={tdStyleAT}>{trip.driver}</td>
                            <td style={tdStyleAT}>{trip.passenger}</td>
                            <td style={tdStyleAT}>{trip.startingAddress}</td>
                            <td style={tdStyleAT}>{trip.finalAddress}</td>
                            <td style={tdStyleAT}>{trip.durationOfTheTrip.replace('min', '')}</td>
                            <td style={tdStyleAT}>{trip.priceOfTheTrip.replace('din', '')}</td>
                            <td style={tdStyleAT}>{trip.state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllTrips;