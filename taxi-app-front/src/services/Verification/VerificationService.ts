/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
const SERVER_URL = 'http://localhost:8986'

class VerificationService {
    async getData() {
        try {
            const response = await axios.get(`${SERVER_URL}/verification`);
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async profileIsAccepted(userName: any, state: any) {
        try {
            const response = await axios.put(`${SERVER_URL}/verification/acceptProfile`, {
                userName: userName,
                state: state
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async profileIsRejected(userName: any, state: any) {
        try {
            const response = await axios.put(`${SERVER_URL}/verification/rejectProfile`, {
                userName: userName,
                state: state
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new VerificationService();