import axios from 'axios';
import { API_HOST } from '../config';

const headers = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const creds = {
    withCredentials: true
}
export async function getTradeList(input) {
    try {
        const { user_id, account_id, filter } = input
        const HOST = `${API_HOST}/api/v1/trade/list`
        const res = await axios.post(HOST, { account_id, filter }, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}

export async function create(input) {
    try {
        const HOST = `${API_HOST}/api/v1/trade`
        const res = await axios.post(HOST, input, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function remove(input) {
    try {
        const { account_id, trade_id } = input
        const HOST = `${API_HOST}/api/v1/trade/${trade_id}`
        const res = await axios.delete(HOST, {
            withCredentials: true,
            data: { account_id }
        });
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function update(input) {
    try {
        const { account_id, trade_id, symbol, order_type, desc, open_time,
            close_time, entry_price, exit_price, qty, pnl, charges } = input
        const HOST = `${API_HOST}/api/v1/trade/${trade_id}`
        const res = await axios.put(HOST, {
            account_id, symbol, order_type, desc, open_time,
            close_time, entry_price, exit_price, qty, pnl, charges
        }, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}

export async function getTradeStats(input) {
    try {
        const { account_id, filter } = input
        const HOST = `${API_HOST}/api/v1/trade/stats`
        const res = await axios.post(HOST, {
            account_id, filter
        }, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}