import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { pageStyleCP, containerStyleCP, headerStyleCP } from './ControlPanelCSS';

const ControlPanelDriver: React.FC = () => {

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

    const openNewTripsPage = async () => {
        redirect('/new-trips');
    }

    const openMyTripsPage = async () => {
        redirect('/my-trips');
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
                        Nove vožnje
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h5 className="card-title"></h5>
                        <p className="card-text">Na ovoj stranici imate prikaz svih aktivnih vožnji i možete da prihvatite neku vožnju.</p>
                        <button type="button" className="btn btn-primary" onClick={openNewTripsPage}>Otvori</button>
                    </div>
                </div>
            </div>
            <div style={containerStyleCP}>
                <div className="card text-center">
                    <div className="card-header" style={headerStyleCP}>
                        Moje vožnje
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h5 className="card-title"></h5>
                        <p className="card-text">Na ovoj stranici možete da videte sve vaše prethodne vožnje.</p>
                        <button type="button" className="btn btn-primary" onClick={openMyTripsPage}>Otvori</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanelDriver;