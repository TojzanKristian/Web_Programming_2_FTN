import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { pageStyleCP, containerStyleCP, headerStyleCP } from './ControlPanelCSS';

const ControlPanelAdmin: React.FC = () => {

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

    const openVerificationPage = async () => {
        redirect('/verification');
    }

    const openAllTripsPage = async () => {
        redirect('/all-trips');
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
                        Verifikacija
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h5 className="card-title"></h5>
                        <p className="card-text">Na ovoj stranici imate prikaz svih registrovanih vozača i možete da odobrite ili odbijete njihov nalog.</p>
                        <button type="button" className="btn btn-primary" onClick={openVerificationPage}>Otvori</button>
                    </div>
                </div>
            </div>
            <div style={containerStyleCP}>
                <div className="card text-center">
                    <div className="card-header" style={headerStyleCP}>
                        Sve vožnje
                    </div>
                    <div className="card-body">
                        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                        <h5 className="card-title"></h5>
                        <p className="card-text">Na ovoj stranici možete da videte sve vožnje u sistemu.</p>
                        <button type="button" className="btn btn-primary" onClick={openAllTripsPage}>Otvori</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanelAdmin;