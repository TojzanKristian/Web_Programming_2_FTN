import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { titleStyleAT, tableStyleAT, tdStyleAT } from './AllTripsCSS'
import TripService from '../../services/Trip/TripService';
import { Trip } from '../../interfaces/Trip';

const AllTrips: React.FC = () => {

    const redirection = useNavigate();
    const [trips, setTrips] = useState<Trip[]>([]);

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za prijem svih vožnji u sistemu sa servera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TripService.getAllTrips();
                const mappedTrips = response.map((trip: any) => ({
                    Driver: trip.driver,
                    Passenger: trip.passenger,
                    StartingAddress: trip.startingAddress,
                    FinalAddress: trip.finalAddress,
                    PriceOfTheTrip: trip.priceOfTheTrip.replace('din', ''),
                    DurationOfTheTrip: trip.durationOfTheTrip.replace('min', ''),
                    State: trip.state
                }));
                setTrips(mappedTrips);
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
                            <td style={tdStyleAT}>{trip.Driver}</td>
                            <td style={tdStyleAT}>{trip.Passenger}</td>
                            <td style={tdStyleAT}>{trip.StartingAddress}</td>
                            <td style={tdStyleAT}>{trip.FinalAddress}</td>
                            <td style={tdStyleAT}>{trip.DurationOfTheTrip}</td>
                            <td style={tdStyleAT}>{trip.PriceOfTheTrip}</td>
                            <td style={tdStyleAT}>{trip.State}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllTrips;