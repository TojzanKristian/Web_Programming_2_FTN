import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    initialMinutes: number;
    onTimeUp: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialMinutes, onTimeUp }) => {

    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [timeUp, setTimeUp] = useState<boolean>(false);

    // Funkcija za pokretanje i praćenje tajmera
    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeUp(true);
            setTimeout(onTimeUp, 2000);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    // Funkcija za podešavanje formata vremena u prikazu tajmera
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div>
            {timeUp ? <span>Završila se vožnja!</span> : formatTime(timeLeft)}
        </div>
    );
};

export default CountdownTimer;