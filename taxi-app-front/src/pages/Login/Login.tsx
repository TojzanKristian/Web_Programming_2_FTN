import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { LoginModel } from '../../interfaces/LoginModel';
import LoginService from '../../services/Login/LoginService';
import NavbarLogin from '../components/NavBar/NavBarLogin';

const Login = () => {

    const redirection = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const logger: LoginModel = {
        email,
        password,
    };

    // Funkcija za validaciju polja i slanje podataka na server za prijavu
    const userLoggingin = async () => {
        if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
            alert("Email mora biti popunjen!");
        }
        else if (password.length === 0 || password.length < 6) {
            alert("Lozinka mora biti popunjena!");
        }
        else {
            try {
                const response = await LoginService.loginUser(logger);
                if (response.message === '3') {
                    alert('Uspešno ste se prijavili kao admin!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard-admin');
                }
                else if (response.message === '2') {
                    alert('Uspešno ste se prijavili kao vozač!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard-driver');
                }
                else if (response.message === '1') {
                    alert('Uspešno ste se prijavili kao korisnik!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard-user');
                }
                else if (response.message === '-1') {
                    alert('Pogrešili ste lozinku!');
                }
                else if (response.message === '-2') {
                    alert('Niste registrovani!');
                    redirection('/registration');
                }
                else {
                    alert('Došlo je do neke greške!');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

    return (
        <div className='logPageStyle'>
            <NavbarLogin />
            <div className='logContainerStyle'>
                <div className='logFormStyle'>
                    <h1 className='logTitleStyle'>Prijava</h1>
                    <table className='logTableStyle'>
                        <tbody>
                            <tr>
                                <td className='logFirstColumnStyle'>Email:</td>
                                <td className='logSecondColumnStyle'>
                                    <input
                                        type="email"
                                        id="email"
                                        className="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className='logFirstColumnStyle'>Lozinka:</td>
                                <td className='logSecondColumnStyle'>
                                    <input
                                        type="password"
                                        id="lozinka"
                                        className="lozinka"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <input
                                        className="btn btn-outline-dark"
                                        id="prijavaDugme"
                                        type="submit"
                                        value="Prijavi se"
                                        onClick={userLoggingin}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Login;