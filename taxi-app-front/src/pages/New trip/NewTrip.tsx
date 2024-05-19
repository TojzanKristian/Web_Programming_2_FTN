import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewTrip.css';
import ConfirmationOfNewTrip from '../components/New trip confirmation/Modal';
import CountdownTimerModal from '../components/Countdown timer/CountdownTimerModal';
import { HubConnectionBuilder } from '@microsoft/signalr';
const SERVER_URL = 'http://localhost:8986';

const NewTrip: React.FC = () => {

    const redirection = useNavigate();
    const [startingAddress, setStartingAddress] = useState<string>("");
    const [finalAddress, setFinalAddress] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [timerDuration, setTimerDuration] = useState(0);
    const [showTimerModal, setShowTimerModal] = useState(false);

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function wait(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Funkcija za konekciju na SignalR hub
    useEffect(() => {
        const hubConnection = new HubConnectionBuilder()
            .withUrl(`${SERVER_URL}/new-trip`) // SignalR hub URL
            .build();

        hubConnection.start()
            .then(() => {
                console.log('Uspešna konekcija na SignalR hub!');
                hubConnection.on('TripAccepted', (message) => {
                    console.log('Primljena poruka kroz SignalR hub:', message.timeForTheTaxiToArrive, message.result);

                    const timeForTheTaxiToArriveNumber = parseFloat(message.timeForTheTaxiToArrive);
                    const durationInMinutes = parseInt(message.result.durationOfTheTrip.replace('min', ''));
                    const timeForTheTaxiToArriveInt = Math.round(timeForTheTaxiToArriveNumber);
                    const durationOfTheTripInt = Math.round(durationInMinutes);
                    setTimerDuration(timeForTheTaxiToArriveInt + durationOfTheTripInt);
                    setShowTimerModal(true);

                    wait(((timeForTheTaxiToArriveInt + durationInMinutes) * 60 * 1000) + 10000);
                    
                });
            })
            .catch((error) => {
                console.error('Došlo je do greške tokom konekcije na SignalR hub:', error);
            });
    }, []);

    // Funkcija za validaciju polja i otvaranje stranice za potvrdu ili odbijanje nove vožnje
    const creatingNewTrip = async () => {
        if (startingAddress.length === 0) {
            alert("Polje za početnu adresu mora biti popunjeno!");
        }
        else if (finalAddress.length === 0) {
            alert("Polje za krajnju adresu mora biti popunjeno!");
        }
        else {
            handleOpenModal();
        }
    }

    return (
        <div className="newTripPageStyle">
            <div className="newTripContainerStyle">
                <div className="newTripFormStyle">
                    <h1 className="newTripTitleStyle">Nova vožnja</h1>
                    <table className="newTripTableStyle">
                        <tbody>
                            <tr>
                                <td className="newTripFirstColumnStyle">Početna adresa:</td>
                                <td className="newTripSecondColumnStyle"><input type="text" value={startingAddress} onChange={(e) => setStartingAddress(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="newTripFirstColumnStyle">Krajnja adresa:</td>
                                <td className="newTripSecondColumnStyle"><input type="text" value={finalAddress} onChange={(e) => setFinalAddress(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <button className="btn btn-outline-dark" onClick={creatingNewTrip}>Poruči</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ConfirmationOfNewTrip showModal={showModal} handleOpenModal={handleCloseModal} handleCloseModal={handleCloseModal} sAddress={startingAddress} fAddress={finalAddress} />
                </div>
                <CountdownTimerModal
                    show={showTimerModal}
                    onHide={() => setShowTimerModal(false)}
                    title={'Odbrojavanje'}
                    initialMinutes={timerDuration}
                />
            </div>
        </div>
    );
};

export default NewTrip;