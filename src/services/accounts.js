import api from './api';

export async function getAccountList(input) {
    try {
        const PATH = `/api/v1/account/list`
        const res = await api.get(PATH)
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function create(input) {
    try {
        const { name, initial_cap, curr } = input
        const PATH = `/api/v1/account`
        const res = await api.post(PATH, { name, initial_cap, curr })
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function update(input) {
    try {
        const { name, initial_cap, curr, account_id } = input
        const PATH = `/api/v1/account/${account_id}`
        const res = await api.put(PATH, { name, initial_cap, curr })
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}
export async function deleteAccount(input) {
    try {
        const { account_id } = input
        const PATH = `/api/v1/account/${account_id}`
        const res = await api.delete(PATH, {})
        return { ...res.data, type: 'success' }
    } catch (error) {
        return { message: error.message, statusCode: error.status, type: 'error' }
    }
}