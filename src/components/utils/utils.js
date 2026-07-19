import moment from "moment";

export function formattedCurrency(amount, curr) {
    const value = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: curr
    }).format(amount);
    return value
}

export function captialize(input) {
    return input.toUpperCase()
}

export function formatDate(input) {
    return { date: moment(input).format('MMM Do YYYY'), time: moment(input).format('h:mm a') }
}