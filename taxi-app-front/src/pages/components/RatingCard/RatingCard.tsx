import { cardStyleRC, buttonStyleRC, buttonContainerStyleRC } from './RatingCardCSS';
import './RatingCardCSS';
import RatingService from "../../../services/Rating/RatingService";
import { useState } from 'react';

interface Props {
    rating: any;
}

const RatingCard: React.FC<Props> = ({ rating }) => {
    const [blocked, setBlocked] = useState<string>(rating.isTheDriverBlocked)

    // Funkcija za obradu blokiranja vozača
    const blockDriver = async () => {
        try {
            const response = await RatingService.blockDriver(rating.driver);
            if (response.message === '1') {
                alert('Uspešno ste blokirali vozača!');
                setBlocked('Da');
            }
            else {
                alert('Došlo je do greške!');
            }
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    // Funkcija za obradu odblokiranje vozača
    const unblockDriver = async () => {
        try {
            const response = await RatingService.unblockDriver(rating.driver);
            if (response.message === '1') {
                alert('Uspešno ste odblokirali vozača!');
                setBlocked('Ne');
            }
            else {
                alert('Došlo je do greške!');
            }
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    return (
        <div style={cardStyleRC}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item special-title">
                    <div>Ocena vozača</div>
                </li>
                <li className="list-group-item">
                    <span>Vozač:</span>
                    <span>{rating.driver}</span>
                </li>
                <li className="list-group-item">
                    <span>Broj ocena:</span>
                    <span>{rating.numberOfRatings}</span>
                </li>
                <li className="list-group-item">
                    <span>Prosečna ocena:</span>
                    <span>{rating.averageRating.toFixed(4)}</span>
                </li>
                <li className="list-group-item">
                    <span>Blokiran:</span>
                    <span>{blocked}</span>
                </li>
                <li className="list-group-item" style={buttonContainerStyleRC}>
                    {blocked !== 'Da' && (
                        <button className="btn btn-outline-dark" style={buttonStyleRC} onClick={blockDriver}>Blokiraj</button>
                    )}
                    <button className="btn btn-outline-dark" style={buttonStyleRC} onClick={unblockDriver}>Odblokiraj</button>
                </li>
            </ul>
        </div>
    );
};

export default RatingCard;