import React, { useState, useEffect } from "react";
import { User, State } from '../../../interfaces/User';
import { cardStyleVC, buttonStyleVC, buttonContainerStyleVC } from './VerificationCardCSS';
import './VerificationCard.css';
import VerificationService from '../../../services/Verification/VerificationService';

interface Props {
    user: User;
}

const VerificationCard: React.FC<Props> = ({ user }) => {

    const hiddenPassword = user.password.replace(/./g, '*');
    const showButtons = user.state === State.Waiting;
    const [state, setState] = useState<string>("");
    const [buttonsState, setButtonsState] = useState<boolean>(true);

    // Funkcija koja real-time ažurira stanje profila korisnika
    useEffect(() => {
        setState(user.state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za obradu prihvatanja profila korisnika
    const acceptProfile = async () => {
        setState(State.Approved);
        setButtonsState(false);
        try {
            const response = await VerificationService.profileIsAccepted(user.userName, State.Approved);
            if (response.message === '1') {
                alert('Uspešno je odobren profil!');
            }
            else {
                alert('Došlo je do greške!');
            }
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    // Funkcija za obradu odbijanja profila korisnika
    const rejectProfile = async () => {
        setState(State.Rejected);
        try {
            const response = await VerificationService.profileIsRejected(user.userName, State.Rejected);
            if (response.message === '1') {
                alert('Uspešno je odbijen profil!');
            }
            else {
                alert('Došlo je do greške!');
            }
        } catch (error) {
            console.error('Došlo je do greške: ', error);
        }
    }

    return (
        <div style={cardStyleVC}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item special-title">
                    <div>Verifikacija naloga</div>
                </li>
                <li className="list-group-item">
                    <span>Korisničko ime:</span>
                    <span>{user.userName}</span>
                </li>
                <li className="list-group-item">
                    <span>Email:</span>
                    <span>{user.email}</span>
                </li>
                <li className="list-group-item">
                    <span>Lozinka:</span>
                    <span>{hiddenPassword.substring(0, 6)}</span>
                </li>
                <li className="list-group-item">
                    <span>Ime:</span>
                    <span>{user.firstName}</span>
                </li>
                <li className="list-group-item">
                    <span>Prezime:</span>
                    <span>{user.lastName}</span>
                </li>
                <li className="list-group-item">
                    <span>Datum rođenja:</span>
                    <span>{user.dateOfBirth}</span>
                </li>
                <li className="list-group-item">
                    <span>Adresa:</span>
                    <span>{user.address}</span>
                </li>
                <li className="list-group-item">
                    <span>Tip korisnika:</span>
                    <span>{user.userType}</span>
                </li>
                <li className="list-group-item">
                    <span>Datum rođenja:</span>
                    <span>{user.dateOfBirth}</span>
                </li>
                <li className="list-group-item">
                    <span>Status:</span>
                    <span>{state}</span>
                </li>
                <li className="list-group-item">
                    <div className='image'>
                        <img src={user.image} className="card-img-top" alt={user.userName} />
                    </div>
                </li>
                <li className="list-group-item" style={buttonContainerStyleVC}>
                    {(showButtons && buttonsState) && (
                        <li className="list-group-item" style={buttonContainerStyleVC}>
                            <button className="btn btn-outline-dark" style={buttonStyleVC} onClick={acceptProfile}>Prihvati</button>
                            <button className="btn btn-outline-dark" style={buttonStyleVC} onClick={rejectProfile}>Odbaci</button>
                        </li>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default VerificationCard;