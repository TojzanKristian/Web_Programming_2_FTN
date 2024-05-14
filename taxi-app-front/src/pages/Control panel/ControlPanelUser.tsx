import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { pageStyleCP, containerStyleCP, headerStyleCP } from './ControlPanelCSS';

const ControlPanelUser: React.FC = () => {

    const redirect = useNavigate();

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirect('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openProfilePage = async () => {
        redirect('/profile');
    }

    const openNewTripPage = async () => {
        redirect('/new-trip');
    }

    const openPreviousTripsPage = async () => {
        redirect('/previous-trips');
    }

    return (
        <div style={pageStyleCP}>
            <div style={containerStyleCP}>
                <div className="card text-center">
                    <div className="card-header" style={headerStyleCP}>
                        Profil
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h5 className="card-title"></h5>
                        <p className="card-text">Na ovoj stranici možete da videte detalje vašeg profila i ažurirate ih.</p>
                        <button type="button" className="btn btn-primary" onClick={openProfilePage}>Otvori</button>
                    </div>
                </div>
            </div>
            <div style={containerStyleCP}>
                <div className="card text-center">
                    <div className="card-header" style={headerStyleCP}>
                        Nova vožnja
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h5 className="card-title"></h5>
                        <p className="card-text">Na ovoj stranici možete da zakažete vožnju i pratite sve detalje oko vožnje.</p>
                        <button type="button" className="btn btn-primary" onClick={openNewTripPage}>Otvori</button>
                    </div>
                </div>
            </div>
            <div style={containerStyleCP}>
                <div className="card text-center">
                    <div className="card-header" style={headerStyleCP}>
                        Prethodne vožnje
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h5 className="card-title"></h5>
                        <p className="card-text">Na ovoj stranici možete da videte sve vaše prethodne vožnje koje ste imali kod nas.</p>
                        <button type="button" className="btn btn-primary" onClick={openPreviousTripsPage}>Otvori</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanelUser;