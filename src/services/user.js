import axios from 'axios';

export async function createUser(input) {
    try {
        const { phone, name, email, trading_exp } = input
        const HOST = `${process.env.REACT_APP_API_URL}/api/v1/user/signup`
        const res = await axios.post(HOST, { phone, name, email, trading_exp })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode } = error.response.data
        return { message, statusCode, type: 'error' }
    }

}