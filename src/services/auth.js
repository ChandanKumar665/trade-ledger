import axios from 'axios';
import { API_HOST } from '../config';

export async function authUser(input) {
    try {
        const { phone } = input
        const HOST = `${API_HOST}/api/v1/user/auth`
        const res = await axios.post(HOST, { phone })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }

}