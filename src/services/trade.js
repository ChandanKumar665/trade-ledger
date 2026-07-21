import axios from 'axios';
const headers = {
    headers: {
        'Content-Type': 'application/json'
    }
}
export async function getTradeList(input) {
    try {
        const { user_id, account_id, filter } = input
        const HOST = `${process.env.REACT_APP_API_URL}/api/v1/trade/list`
        const res = await axios.post(HOST, { user_id, account_id, filter })
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}

export async function create(input) {
    try {
        const HOST = `${process.env.REACT_APP_API_URL}/api/v1/trade`
        const res = await axios.post(HOST, input)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function remove(input) {
    try {
        const { user_id, account_id, trade_id } = input
        const HOST = `${process.env.REACT_APP_API_URL}/api/v1/trade/remove`
        const res = await axios.post(HOST, { user_id, account_id, trade_id }, headers)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function update(input) {
    try {
        const { user_id, account_id, trade_id, symbol, order_type, desc, open_time,
            close_time, entry_price, exit_price, qty, pnl, charges } = input
        const HOST = `${process.env.REACT_APP_API_URL}/api/v1/trade/update`
        const res = await axios.post(HOST, {
            user_id, account_id, trade_id, symbol, order_type, desc, open_time,
            close_time, entry_price, exit_price, qty, pnl, charges
        }, headers)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}

export async function getTradeStats(input) {
    try {
        const { user_id, account_id, filter } = input
        const HOST = `${process.env.REACT_APP_API_URL}/api/v1/trade/stats`
        const res = await axios.post(HOST, {
            user_id, account_id, filter
        }, headers)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}