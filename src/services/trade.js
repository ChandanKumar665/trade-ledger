import api from './api';

export async function getTradeList(input) {
    try {
        const { account_id, filter } = input
        const PATH = `/api/v1/trade/list`
        const res = await api.post(PATH, { account_id, filter })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}

export async function create(input) {
    try {
        const PATH = `/api/v1/trade`
        const res = await api.post(PATH, input)
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}

export async function createMany(input) {
    try {
        const PATH = `/api/v1/trade/csv_save`
        const res = await api.post(PATH, input)
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function remove(input) {
    try {
        const { account_id, trade_id } = input
        const PATH = `/api/v1/trade/${trade_id}`
        const res = await api.delete(PATH, {
            data: { account_id }
        });
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}
export async function update(input) {
    try {
        const { account_id, trade_id, symbol, order_type, desc, open_time,
            close_time, entry_price, exit_price, qty, pnl, charges } = input
        const PATH = `/api/v1/trade/${trade_id}`
        const res = await api.put(PATH, {
            account_id, symbol, order_type, desc, open_time,
            close_time, entry_price, exit_price, qty, pnl, charges
        })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}

export async function getTradeStats(input) {
    try {
        const { account_id, filter } = input
        const PATH = `/api/v1/trade/stats`
        const res = await api.post(PATH, {
            account_id, filter
        })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}

export async function getCalendarTradeStats(input) {
    try {
        const { account_id, filter } = input
        const PATH = `/api/v1/trade/stats/cal`
        const res = await api.post(PATH, {
            account_id, filter
        })
        return { ...res.data, type: 'success' }
    } catch (error) {
        const { message, statusCode, } = error.response.data
        return { message, statusCode, type: 'error' }
    }
}