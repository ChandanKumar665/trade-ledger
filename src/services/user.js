import axios from 'axios';
import { API_HOST } from '../config';
const creds = {
    withCredentials: true
}
export async function updateUser(input) {
    try {
        const { name, email, bio, trading_exp } = input
        const HOST = `${API_HOST}/api/v1/user/update`
        const res = await axios.put(HOST, { name, email, bio, trading_exp }, creds);
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function getProfile() {
    try {
        const HOST = `${API_HOST}/api/v1/user/profile`
        const res = await axios.get(HOST, creds);
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}