/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError } from 'axios';
const SERVER_URL = 'http://localhost:8986'

class NewTripService {
    async createNewTrip(startingAddress: any, finalAddress: any, priceOfTheTrip: any, timeForTheTaxiToArrive: any, durationOfTheTrip: any) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${SERVER_URL}/trips/createNewTrip`, {
                startingAddress: startingAddress,
                finalAddress: finalAddress,
                priceOfTheTrip: priceOfTheTrip.toFixed(2),
                timeForTheTaxiToArrive: timeForTheTaxiToArrive.toFixed(2),
                durationOfTheTrip: durationOfTheTrip.toFixed(2)
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

    async getActiceTrips() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/trips/getActiveTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async getMyTrips() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/trips/getMyTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async getAllTrips() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/trips/getAllTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async getPassengersTrips() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${SERVER_URL}/trips/getPassengersTrips`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Došlo je do greške: ' + (error as AxiosError).message);
        }
    }

    async acceptanceOfTrip(trip: any) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${SERVER_URL}/trips/acceptTheTrip`, {
                id: trip.id,
                state: "Aktivan"
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

export default new NewTripService();