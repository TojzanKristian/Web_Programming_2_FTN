import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewTrip.css';
import ConfirmationOfNewTrip from '../components/New trip confirmation/Modal';

const NewTrip: React.FC = () => {

    const redirection = useNavigate();
    const [startingAddress, setStartingAddress] = useState<string>("");
    const [finalAddress, setFinalAddress] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            </div>
        </div>
    );
};

export default NewTrip;