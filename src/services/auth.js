import api from './api';

export async function getLoggedInUser() {
    try {
        const PATH = `/api/v1/auth/me`
        const res = await api.get(PATH)
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function authUser(input) {
    try {
        const { phone, fbtoken } = input
        const PATH = `/api/v1/auth/login`
        const res = await api.post(PATH, { phone, fbtoken })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function logoutUser() {
    try {
        const PATH = `/api/v1/auth/logout`
        const res = await api.post(PATH, {})
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function createUser(input) {
    try {
        const { phone, name, email, trading_exp } = input
        const PATH = `/api/v1/auth/signup`
        const res = await api.post(PATH, { phone, name, email, trading_exp })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}