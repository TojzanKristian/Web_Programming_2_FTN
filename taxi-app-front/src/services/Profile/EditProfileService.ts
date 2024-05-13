/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';

const SERVER_URL = 'http://localhost:8986';

class ProfileService {
    async getProfileData() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async editProfile(profileData: any) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${SERVER_URL}/profile`, {
                userName: profileData.userName,
                email: profileData.email,
                password: profileData.password,
                passwordCheck: profileData.passwordCheck,
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                dateOfBirth: profileData.dateOfBirth,
                address: profileData.address,
                userType: profileData.userType,
                image: profileData.image,
                state: profileData.state
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new ProfileService();