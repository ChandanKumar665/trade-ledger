import axios from 'axios';

export async function getTradeList(input) {
    const { user_id, account_id } = input
    const HOST = 'http://localhost:4000/api/v1/trade/list'
    const res = await axios.post(HOST, { user_id, account_id })
    return res.data
}