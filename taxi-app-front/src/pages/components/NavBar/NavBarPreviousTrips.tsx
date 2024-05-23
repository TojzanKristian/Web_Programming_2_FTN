import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyle, linkStyle } from './NavBarCSS';

const NavBarPreviousTrips: React.FC = () => {
    return (
        <div style={navBarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" style={linkStyle}>Profil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/new-trip" className="nav-link" style={linkStyle}>Nova vožnja</Link>
                </li>
                <li className="nav-item">
                    <Link to="/previous-trips" className="nav-link active" style={linkStyle}>Prethodne vožnje</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBarPreviousTrips;