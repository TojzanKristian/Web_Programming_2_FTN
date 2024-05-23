import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../../interfaces/User';
import VerificationCard from '../components/VerificationCard/VerificationCard';
import { pageStyleVerify, containerStyleVerify } from './VerificationCSS';
import VerificationService from '../../services/Verification/VerificationService';
import NavbarVerification from '../components/NavBar/NavBarVerification';

const Verification: React.FC = () => {

    const redirection = useNavigate();
    const [data, setData] = useState<User[]>([]);

    // Funkcija za zaštitu stranice i prijem svih korisnika u sistemu sa servera
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await VerificationService.getData();
                setData(response);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={pageStyleVerify}>
            <NavbarVerification />
            <div style={containerStyleVerify}>
                {data.map((user, index) => (
                    <VerificationCard key={index} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Verification;