import axios from 'axios';
import { API_HOST } from '../config';
const creds = {
    withCredentials: true
}
export async function getLoggedInUser() {
    try {
        const HOST = `${API_HOST}/api/v1/auth/me`
        const res = await axios.get(HOST, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function authUser(input) {
    try {
        const { phone, fbtoken } = input
        const HOST = `${API_HOST}/api/v1/auth/login`
        const res = await axios.post(HOST, { phone, fbtoken }, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function logoutUser() {
    try {
        const HOST = `${API_HOST}/api/v1/auth/logout`
        const res = await axios.post(HOST, {}, creds)
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
        const res = await axios.post(HOST, { phone, name, email, trading_exp }, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}