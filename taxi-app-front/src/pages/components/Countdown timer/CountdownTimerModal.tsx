import React from 'react';
import { Modal } from 'react-bootstrap';
import CountdownTimer from '../Countdown timer/CountdownTimer';
import './Modal.css';

interface CountdownTimerModalProps {
    show: boolean;
    onHide: () => void;
    title: string;
    initialMinutes: number;
}

const CountdownTimerModal: React.FC<CountdownTimerModalProps> = ({ show, onHide, title, initialMinutes }) => {
    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
            <Modal.Header closeButton={false}>
                <Modal.Title className="titleStyle">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bodyStyle">
                <CountdownTimer initialMinutes={initialMinutes} onTimeUp={onHide} />
            </Modal.Body>
        </Modal>
    );
};

export default CountdownTimerModal;