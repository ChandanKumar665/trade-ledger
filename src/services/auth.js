import axios from 'axios';

export async function authUser(input) {
    try {
        const { phone } = input
        const HOST = `${process.env.REACT_APP_API_URL}/api/v1/user/auth`
        const res = await axios.post(HOST, { phone })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }

}