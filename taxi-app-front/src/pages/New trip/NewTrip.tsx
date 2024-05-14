import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const NewTrip: React.FC = () => {

    const redirection = useNavigate();

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Kreiranje nove vožnje</h1>
        </div>
    );
};

export default NewTrip;