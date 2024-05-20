import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Modal.css';
import { Rating } from '../../../interfaces/Rating';
import RatingService from '../../../services/Rating/RatingService';

interface Props {
    show: boolean;
    onClose: () => void;
    driver: string;
}

const RatingDriverModal: React.FC<Props> = ({ show, onClose, driver }) => {

    const [driverRating, setDriverRating] = useState<Rating>({
        driver: driver,
        rating: 0,
    });

    const handleRatingChange = (value: number) => {
        setDriverRating({ ...driverRating, rating: value });
    };

    const handleSubmit = async () => {
        if (driverRating.rating !== 0) {
            console.log(driverRating.driver + driverRating.rating);
            const response = await RatingService.rateDriver(driverRating);
            if(response.message === "1") {
                alert("Hvala što ste odvojili vreme da ocenite vozača!");
                //onClose();
            }
        } else {
            console.log("!!!");
            //onClose();
        }
    };    

    const cancelHandleSubmit = () => {
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ocenite uslugu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Molimo vas ocenite uslogu vozača:</p>
                <div className="rating-options">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value}>
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                checked={driverRating.rating === value}
                                onChange={() => handleRatingChange(value)}
                            />
                            {value}
                        </label>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={handleSubmit}>Oceni</Button>
                <Button variant="outline-dark" onClick={cancelHandleSubmit}>Odustani</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RatingDriverModal;