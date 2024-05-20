import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import TripService from '../../../services/Trip/TripService';

interface ConfirmationOfNewTripProps {
    showModal: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    sAddress: string;
    fAddress: string;
}

const ConfirmationOfNewTrip: React.FC<ConfirmationOfNewTripProps> = ({
    showModal,
    handleOpenModal,
    handleCloseModal,
    sAddress,
    fAddress
}) => {

    const [pricePerKilometer] = useState<number>(90.0);
    const [startingPrice] = useState<number>(190.0);
    const [priceOfTheTrip, setPriceOfTheTrip] = useState<number>(0.0);
    const [durationOfTheTrip, setDurationOfTheTrip] = useState<number>(0.0);
    const [timeForTheTaxiToArrive, setTimeForTheTaxiToArrive] = useState<number>(0.0);

    // Funkcija koja vraća random broj za udaljenost
    function getRandomNumber(): number {
        return Math.floor(Math.random() * 10) + 1;
    }

    // Funkcija koja vraća random broj za vreme vožnje
    function getRandomMinute(): number {
        //return 1;
        return Math.floor(Math.random() * 56) + 5;
    }

    // Funkcija koja vraća random broj za vreme dok taxi stigne
    function getRandomMinuteForTaxiToArrive(): number {
        //return 1;
        return Math.floor(Math.random() * 6) + 3;
    }

    // Funkcija za podešavanje vrednosti za dinamički prikaz
    useEffect(() => {
        setPriceOfTheTrip(startingPrice + (getRandomNumber() * pricePerKilometer));
        setDurationOfTheTrip(getRandomMinute());
        setTimeForTheTaxiToArrive(getRandomMinuteForTaxiToArrive());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sAddress, fAddress]);

    // Funkcija za obradu kreiranja nove vožnje
    const newTripConfirmation = async () => {
        const response = await TripService.createNewTrip(sAddress, fAddress, priceOfTheTrip, timeForTheTaxiToArrive, durationOfTheTrip);
        if (response.message === '1') {
            alert('Uspešno ste kreirali novu vožnju!');
            handleCloseModal();
        }
        else {
            alert('Došlo je do greške tokom obrade podataka!');
            handleCloseModal();
        }
    }

    // Funkcija za obradu odustanka od nove vožnje
    const cancelingNewTrip = async () => {
        alert('Odustali ste od nove vožnje!');
        handleCloseModal();
    }

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Potvrda nove vožnje</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>Cena vožnje sa adrese {sAddress} na adresu {fAddress} je: {priceOfTheTrip} dinara.</span>
                    </div>
                    <div>
                        <span>Vreme potrebno da taxi stigne do vas je: {timeForTheTaxiToArrive} minuta.</span>
                    </div>
                    <div>
                        <span>Trajanje vožnje sa adrese {sAddress} na adresu {fAddress} je: {durationOfTheTrip} minuta.</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-dark" onClick={newTripConfirmation}>Potvrdi</button>
                    <button className="btn btn-outline-dark" onClick={cancelingNewTrip}>Odustani</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConfirmationOfNewTrip;