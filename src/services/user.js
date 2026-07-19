import axios from 'axios';

export async function createUser(input) {
    try {
        const { phone, name, email, trading_exp } = input
        const HOST = 'http://localhost:4000/api/v1/user/signup'
        const res = await axios.post(HOST, { phone, name, email, trading_exp })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, success } = error.response.data
        return { message, statusCode, type: 'error' }
    }

}