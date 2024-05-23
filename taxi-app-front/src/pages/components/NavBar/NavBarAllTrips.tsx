import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyle, linkStyle } from './NavBarCSS';

const NavBarAllTrips: React.FC = () => {
    return (
        <div style={navBarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" style={linkStyle}>Profil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/verification" className="nav-link" style={linkStyle}>Verifikacija</Link>
                </li>
                <li className="nav-item">
                    <Link to="/ratings" className="nav-link" style={linkStyle}>Ocene vozača</Link>
                </li>
                <li className="nav-item">
                    <Link to="/all-trips" className="nav-link active" style={linkStyle}>Sve vožnje</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBarAllTrips;