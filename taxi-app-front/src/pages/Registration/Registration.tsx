import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import { User, State } from '../../interfaces/User';
import RegistrationService from '../../services/Registration/RegistrationService';
import NavbarReg from '../components/NavBar/NavBarReg';
import { GoogleLogin } from 'react-google-login';

const Registration: React.FC = () => {

    const redirection = useNavigate();
    const clientId = '781999004701-75nidrkkr11fc3jru4j98o65u7t9gp9j.apps.googleusercontent.com';
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [userType, setUserType] = useState<string>("user");
    const [image, setImage] = useState<string>("");
    const user: User = {
        userName,
        email,
        password,
        passwordCheck,
        firstName,
        lastName,
        dateOfBirth,
        address,
        userType,
        image,
        state: State.Waiting
    };

    // Funkcija za validaciju polja i slanje podataka na server za registraciju
    const userRegistration = async () => {
        var dob = new Date(dateOfBirth);
        var currentYear = new Date().getFullYear();
        var dobYear = dob.getFullYear();
        if (userName.length === 0) {
            alert("Polje za korisničko ime mora biti popunjeno!");
        }
        else if (!/[a-zA-Z0-9]/.test(userName)) {
            alert("Korisničko ime mora sadržavati slova ili brojeve!");
        }
        else if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email) || !email.includes('@') || !email.includes('.')) {
            alert("Email mora biti popunjen!");
        }
        else if (password.length === 0 || password.length < 6) {
            alert("Lozinka mora biti popunjena!");
        }
        else if (passwordCheck.length === 0 || password.length < 6) {
            alert("Polje za proveru lozinke mora biti popunjeno!");
        }
        else if (passwordCheck !== password) {
            alert("Polje za lozinku i proveru se ne poklapaju!");
        }
        else if (firstName.length === 0) {
            alert("Polje za ime mora biti popunjeno!");
        }
        else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(firstName)) {
            alert("Za polje ime se moraju uneti samo slova!");
        }
        else if (lastName.length === 0) {
            alert("Polje za prezime mora biti popunjeno!");
        }
        else if (!/^[a-zA-Z\u00C0-\u017F]*$/.test(lastName)) {
            alert("Za polje prezime se moraju uneti samo slova!");
        }
        else if (dateOfBirth.length === 0) {
            alert("Polje za datum rođenja mora biti popunjen!");
        }
        else if (dobYear >= currentYear) {
            alert("Datum rođenja nije validan!");
        }
        else if (address.length === 0) {
            alert("Polje za adresu mora biti popunjeno!");
        }
        else if (!/^[a-zA-Z0-9\s\u00C0-\u017F]+$/.test(address)) {
            alert("Polje za adresu mora sadržati samo slova i brojeve!");
        }
        else {
            try {
                const response = await RegistrationService.registerUser(user);
                if (response.message === '1') {
                    alert('Uspešno ste se registrovali!');
                    redirection('/login');
                }
                else if (response.message === '-1') {
                    alert('Već postoji korisnik sa korisničkim imenom ' + user.userName + '!');
                }
                else if (response.message === '-2') {
                    alert('Već postoji korisnik sa emailom ' + user.email + '!');
                }
                else {
                    alert('Registracija je neuspešna. Došlo je do greške tokom obrade podataka!');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        }
    }

    // Funkcija za dinamički prikaz odabrane slike
    function previewImageReg(input: any) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    const previewImg = document.getElementById('profileImage') as HTMLImageElement | null;
                    if (previewImg) {
                        previewImg.src = e.target.result as string;
                        previewImg.style.width = '120px';
                        previewImg.style.height = 'auto';
                    }
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Funkcija za obradu uspešne prijave sa google nalogom
    const handleGoogleLoginSuccess = async (response: any) => {
        if (response.profileObj) {
            const { name, email, familyName, givenName } = response.profileObj;
            try {
                const response = await RegistrationService.googleAccountLogin(name, email, familyName, givenName);
                if (response.message === '2') {
                    alert('Uspešno ste se registrovali!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard-user');
                }
                else if (response.message === '1') {
                    alert('Uspešno ste se prijavili!');
                    const token = response.token;
                    localStorage.setItem('token', token);
                    redirection('/dashboard-user');
                }
                else {
                    alert('Registracija je neuspešna. Došlo je do greške tokom obrade podataka!');
                }
            } catch (error) {
                console.error("Došlo je do greške:", error);
            }
        } else {
            console.error('Došlo je do greške!');
        }
    };

    // Funkcija za obradu greške pri prijavi sa google nalogom
    const handleGoogleLoginFailure = (error: any) => {
        alert("Došlo je do greške!");
        console.error('Došlo je do greške pri prijavi na Google nalog:', error);
    };

    return (
        <div className="regPageStyle">
            <NavbarReg />
            <div className="regContainerStyle">
                <div className="regFormStyle">
                    <h1 className="regTitleStyle">Registracija</h1>
                    <table className="regTableStyle">
                        <tbody>
                            <tr>
                                <td className="regFirstColumnStyle">Korisničko ime:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Email:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Lozinka:</td>
                                <td className="regSecondColumnStyle"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Provera lozinke:</td>
                                <td className="regSecondColumnStyle"><input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Ime:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Prezime:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Datum rođenja:</td>
                                <td className="regSecondColumnStyle"><input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Adresa:</td>
                                <td className="regSecondColumnStyle"><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Tip korisnika:</td>
                                <td className="regSecondColumnStyle">
                                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                                        <option value="user">Korisnik</option>
                                        <option value="driver">Vozač</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="regFirstColumnStyle">Slika:</td>
                                <td className="regSecondColumnStyle"><input type="file" value={image} onChange={(e) => {
                                    setImage(e.target.value);
                                    previewImageReg(e.target);
                                }} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <img id="profileImage" src="image" alt="" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <button className="btn btn-outline-dark" onClick={userRegistration}>Registruj se</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Koristi Google nalog"
                                        onSuccess={handleGoogleLoginSuccess}
                                        onFailure={handleGoogleLoginFailure}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Registration;