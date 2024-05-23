import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import { User, State } from '../../interfaces/User';
import ProfileService from '../../services/Profile/EditProfileService';
import NavbarProfileUser from "../components/NavBar/NavBarProfileUser";
import NavbarProfileDriver from "../components/NavBar/NavBarProfileDriver";
import NavbarProfileAdmin from "../components/NavBar/NavBarProfileAdmin";

const Profile: React.FC = () => {

    const redirection = useNavigate();
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [userType, setUserType] = useState<string>("");
    const [state, setState] = useState<string>(State.None);
    const [image, setImage] = useState<string>("");
    const [imageInput] = useState<string>("");
    const [data, setData] = useState<User>({
        userName: userName,
        email: email,
        password: password,
        passwordCheck: passwordCheck,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        address: address,
        userType: userType,
        image: image,
        state: State.None
    });
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
        state
    };

    // Funkcija za zaštitu stranice
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            redirection('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funkcija za prijem podataka o korisniku sa servera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProfileService.getProfileData();
                let typeOfUser = "";
                if (response.userType === 'user') {
                    typeOfUser = 'Korisnik';
                }
                else if (response.userType === 'driver') {
                    typeOfUser = 'Vozač';
                }
                else {
                    typeOfUser = response.userType;
                }
                setData({
                    userName: response.userName,
                    email: response.email,
                    password: response.password,
                    passwordCheck: response.password,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    dateOfBirth: response.dateOfBirth,
                    address: response.address,
                    userType: typeOfUser,
                    image: response.image,
                    state: response.state
                });
                setState(response.state);
                setUserType(typeOfUser);
            } catch (error) {
                console.error('Došlo je do greške: ', error);
            }
        };
        fetchData();
    }, []);

    // Funkcija za podešavanje vrednosti polja za prikaz informacija o korisniku
    useEffect(() => {
        setUserName(data.userName || '');
        setEmail(data.email || '');
        setPassword(data.password || '');
        setPasswordCheck(data.password || '');
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setDateOfBirth(data.dateOfBirth || '');
        setAddress(data.address || '');
        setImage(data.image || '');
    }, [data]);


    // Funkcija za validaciju polja i slanje podataka na server za izmenu profila
    const modifyProfile = async () => {
        var year = new Date(dateOfBirth);
        var currentYear = new Date().getFullYear();
        var fullYear = year.getFullYear();
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
        else if (fullYear >= currentYear) {
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
                const response = await ProfileService.editProfile(user);
                if (response.message === '1') {
                    alert('Uspešno ste ažurirali profil!');
                }
                else {
                    alert('Došlo je do greške tokom obrade podataka!');
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
                        previewImg.style.width = '150px';
                        previewImg.style.height = 'auto';
                    }
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Podešavanje za NavBar u zavisnosti od uloge
    let NavbarComponent;
    switch (data.userType) {
        case 'Korisnik':
            NavbarComponent = NavbarProfileUser;
            break;
        case 'Admin':
            NavbarComponent = NavbarProfileAdmin;
            break;
        case 'Vozač':
            NavbarComponent = NavbarProfileDriver;
            break;
        default:
            NavbarComponent = null;
    }

    return (
        <div>
            <div className="pageStyleProfile ">
                {NavbarComponent && <NavbarComponent />}
                <div className="containerStyleProfile ">
                    <div className="formStyleProfile ">
                        <h1 className="titleStyleProfile ">Profil</h1>
                        <table className="tableStyleProfile ">
                            <tbody>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Korisničko ime:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Email:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Lozinka:</td>
                                    <td className="secondColumnStyleProfile "><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Provera lozinke:</td>
                                    <td className="secondColumnStyleProfile "><input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Ime:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Prezime:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Datum rođenja:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Adresa:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Tip korisnika:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={userType} readOnly /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Status:</td>
                                    <td className="secondColumnStyleProfile "><input type="text" value={data.state} readOnly /></td>
                                </tr>
                                <tr>
                                    <td className="firstColumnStyleProfile ">Slika:</td>
                                    <td className="secondColumnStyleProfile "><input type="file" value={imageInput} onChange={(e) => {
                                        setImage(e.target.value);
                                        previewImageReg(e.target);
                                    }} /></td>
                                </tr>
                                <tr>
                                    <td colSpan={2} align="center" className="profileImageContainer">
                                        <img id="profileImage" src={image} alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} align="center">
                                        <button className="btn btn-outline-dark" onClick={modifyProfile}>Izmeni profil</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;