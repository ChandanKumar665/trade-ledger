import axios from 'axios';
import { API_HOST } from '../config';

export async function createUser(input) {
    try {
        const { phone, name, email, trading_exp } = input
        const HOST = `${API_HOST}/api/v1/user/signup`
        const res = await axios.post(HOST, { phone, name, email, trading_exp })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function updateUser(input) {
    try {
        const { name, email, bio, user_id, trading_exp } = input
        const HOST = `${API_HOST}/api/v1/user/update`
        const res = await axios.post(HOST, { name, email, bio, user_id, trading_exp });
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function getProfile(input) {
    try {
        const { user_id } = input
        const HOST = `${API_HOST}/api/v1/user/profile`
        const res = await axios.post(HOST, { user_id });
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}