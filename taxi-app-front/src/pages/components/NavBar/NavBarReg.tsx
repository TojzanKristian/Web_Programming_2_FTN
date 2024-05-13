import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyle, linkStyle } from './NavBarCSS';

const NavbarLogin: React.FC = () => {
    return (
        <div style={navBarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link to="/login" className="nav-link" style={linkStyle}>Prijava</Link>
                </li>
                <li className="nav-item">
                    <Link to="/registration" className="nav-link active" style={linkStyle}>Registracija</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavbarLogin;