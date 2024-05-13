/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
import { State } from '../../interfaces/User';
import { GoogleAccModel } from '../../interfaces/GoogleAccountModel';
const SERVER_URL = 'http://localhost:8986'

class RegistrationService {
    async registerUser(userData: any) {
        try {
            if (userData.userType === 'user') {
                userData.state = State.Approved
            }
            else if (userData.userType === 'driver') {
                userData.state = State.Waiting
            }

            const response = await axios.post(`${SERVER_URL}/registration`, {
                userName: userData.userName,
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                dateOfBirth: userData.dateOfBirth,
                address: userData.address,
                userType: userData.userType,
                image: userData.image,
                state: userData.state
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async googleAccountLogin(name: any, email: any, familyName: any, givenName: any) {
        const user: GoogleAccModel = {
            userName: name,
            email: email,
            firstName: givenName,
            lastName: familyName,
        };

        try {
            const response = await axios.post(`${SERVER_URL}/registration/googleAccountLogin`, {
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: 'user',
                state: State.Approved
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new RegistrationService();