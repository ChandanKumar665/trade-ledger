import axios from 'axios';

export async function authUser(input) {
    try {
        const { phone } = input
        const HOST = 'http://localhost:4000/api/v1/user/auth'
        const res = await axios.post(HOST, { phone })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, success } = error.response.data
        return { message, statusCode, type: 'error' }
    }

}