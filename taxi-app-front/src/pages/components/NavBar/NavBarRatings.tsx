import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyleVandR, linkStyleVandR } from './NavBarCSSVandR'

const NavbarRatings: React.FC = () => {
    return (
        <div style={navBarStyleVandR}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" style={linkStyleVandR}>Profil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/verification" className="nav-link" style={linkStyleVandR}>Verifikacija</Link>
                </li>
                <li className="nav-item">
                    <Link to="/ratings" className="nav-link active" style={linkStyleVandR}>Ocene vozača</Link>
                </li>
                <li className="nav-item">
                    <Link to="/all-trips" className="nav-link" style={linkStyleVandR}>Sve vožnje</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavbarRatings;