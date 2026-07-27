import axios from 'axios';
import { API_HOST } from '../config';

export async function authUser(input) {
    try {
        const { phone } = input
        const HOST = `${API_HOST}/api/v1/auth/login`
        const res = await axios.post(HOST, { phone })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function createUser(input) {
    try {
        const { phone, name, email, trading_exp } = input
        const HOST = `${API_HOST}/api/v1/auth/signup`
        const res = await axios.post(HOST, { phone, name, email, trading_exp })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}