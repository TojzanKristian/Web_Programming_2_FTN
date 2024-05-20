/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
const SERVER_URL = 'http://localhost:8986'

class RatingService {
    async getRatingeData() {
        try {
            const response = await axios.get(`${SERVER_URL}/rating`);
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async rateDriver(driverRating: any) {
        try {
            const response = await axios.post(`${SERVER_URL}/rating`, {
                driver: driverRating.driver,
                rating: driverRating.rating
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async blockDriver(driver: any) {
        try {
            const response = await axios.put(`${SERVER_URL}/rating/blockDriver`, {
                driver: driver
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }
}

export default new RatingService();