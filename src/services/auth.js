import axios from 'axios';

export async function authUser(input) {
    const { phone } = input
    const HOST = 'http://localhost:4000/api/v1/user/auth'
    const res = await axios.post(HOST, { phone })
    return res.data
}