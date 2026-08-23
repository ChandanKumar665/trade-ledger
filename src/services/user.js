import api from './api';

export async function updateUser(input) {
    try {
        const { name, email, bio, trading_exp } = input
        const PATH = `/api/v1/user/update`
        const res = await api.put(PATH, { name, email, bio, trading_exp });
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function getProfile() {
    try {
        const PATH = `/api/v1/user/profile`
        const res = await api.get(PATH);
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}