/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
const SERVER_URL = 'http://localhost:8986'

class LoginService {
    async loginUser(logger: any) {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, {
                email: logger.email,
                password: logger.password
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new LoginService();