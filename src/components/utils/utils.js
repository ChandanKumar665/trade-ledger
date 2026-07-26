import moment from "moment";

export function formattedCurrency(amount, curr) {
    const value = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: curr
    }).format(amount);
    return value > 0 ? `+${value}` : value;
}

export function captialize(input) {
    return input.toUpperCase()
}

export function formatDate(input) {
    return { date: moment(input).format('MMM Do YYYY'), time: moment(input).format('h:mm a') }
}

export function getInitials(name) {
    return name
        .trim()
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
}