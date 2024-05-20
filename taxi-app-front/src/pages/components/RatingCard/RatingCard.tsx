import { cardStyleRC, buttonStyleRC, buttonContainerStyleRC } from './RatingCardCSS';
import './RatingCardCSS';
import RatingService from "../../../services/Rating/RatingService";

interface Props {
    rating: any;
}

const RatingCard: React.FC<Props> = ({ rating }) => {

    // Funkcija za obradu odbijanja profila korisnika
    const blockDriver = async () => {
        try {
            const response = await RatingService.blockDriver(rating.driver);
            if (response.message === '1') {
                alert('Uspešno ste blokirali vozača!');
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
                    <div>Uvid u ocenu</div>
                </li>
                <li className="list-group-item">
                    <span>Vozač:</span>
                    <span>{rating.driver}</span>
                </li>
                <li className="list-group-item">
                    <span>Prosečna ocena:</span>
                    <span>{rating.averageRating}</span>
                </li>
                <li className="list-group-item">
                    <span>Blokiran:</span>
                    <span>{rating.isTheDriverBlocked}</span>
                </li>
                <li className="list-group-item" style={buttonContainerStyleRC}>
                    <button className="btn btn-outline-dark" style={buttonStyleRC} onClick={blockDriver}>Blokiraj</button>
                </li>
            </ul>
        </div>
    );
};

export default RatingCard;