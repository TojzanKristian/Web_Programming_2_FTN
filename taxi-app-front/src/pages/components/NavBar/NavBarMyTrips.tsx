import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyle, linkStyle } from './NavBarCSS';

const NavBarMyTrips: React.FC = () => {
    return (
        <div style={navBarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" style={linkStyle}>Profil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/new-trips" className="nav-link" style={linkStyle}>Nove vožnje</Link>
                </li>
                <li className="nav-item">
                    <Link to="/my-trips" className="nav-link active" style={linkStyle}>Moje vožnje</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavBarMyTrips;