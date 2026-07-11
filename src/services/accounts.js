import axios from 'axios';
const headers = {
    headers: {
        'Content-Type': 'application/json'
    }
}
export async function getAccountList(input) {
    try {
        const { user_id } = input
        const HOST = 'http://localhost:4000/api/v1/account/list'
        const res = await axios.post(HOST, { user_id }, headers)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function create(input) {
    try {
        const { user_id, name, initial_cap, curr } = input
        const HOST = 'http://localhost:4000/api/v1/account'
        const res = await axios.post(HOST, { user_id, name, initial_cap, curr }, headers)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function update(input) {
    try {
        const { user_id, name, initial_cap, curr, account_id } = input
        const HOST = 'http://localhost:4000/api/v1/account/update'
        const res = await axios.post(HOST, { user_id, name, initial_cap, curr, account_id }, headers)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function deleteAccount(input) {
    try {
        const { user_id, account_id } = input
        const HOST = 'http://localhost:4000/api/v1/account/remove'
        const res = await axios.post(HOST, { user_id, account_id }, headers)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}