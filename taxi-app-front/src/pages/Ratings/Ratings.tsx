import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import RatingCard from '../components/RatingCard/RatingCard';
import { pageStyleRating, containerStyleRating } from './RatingsCSS';
import RatingService from '../../services/Rating/RatingService';

const Ratings: React.FC = () => {

    const redirection = useNavigate();
    const [data, setData] = useState<[]>([]);

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RatingService.getRatingeData();
                setData(response);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={pageStyleRating}>
            <div style={containerStyleRating}>
                {data.map((rating, index) => (
                    <RatingCard key={index} rating={rating} />
                ))}
            </div>
        </div>
    );
};

export default Ratings;