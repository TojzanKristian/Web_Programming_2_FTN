import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../../interfaces/User';
import VerificationCard from '../components/VerificationCard/VerificationCard';
import { pageStyleVerify, containerStyleVerify } from './VerificationCSS';
import VerificationService from '../../services/Verification/VerificationService';

const Verification: React.FC = () => {

    const redirection = useNavigate();
    const [data, setData] = useState<User[]>([]);

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za prijem svih korisnika u sistemu sa servera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await VerificationService.getData();
                setData(response);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={pageStyleVerify}>
            <div style={containerStyleVerify}>
                {data.map((user, index) => (
                    <VerificationCard key={index} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Verification;