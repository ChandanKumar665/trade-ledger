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
export async function getAccountList(input) {
    try {
        const HOST = `${API_HOST}/api/v1/account/list`
        const res = await axios.get(HOST, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function create(input) {
    try {
        const { name, initial_cap, curr } = input
        const HOST = `${API_HOST}/api/v1/account`
        const res = await axios.post(HOST, { name, initial_cap, curr }, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function update(input) {
    try {
        const { name, initial_cap, curr, account_id } = input
        const HOST = `${API_HOST}/api/v1/account/${account_id}`
        const res = await axios.put(HOST, { name, initial_cap, curr }, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function deleteAccount(input) {
    try {
        const { account_id } = input
        const HOST = `${API_HOST}/api/v1/account/${account_id}`
        const res = await axios.delete(HOST, {}, creds)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}