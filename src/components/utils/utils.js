export function formattedCurrency(amount, curr) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: curr
    }).format(amount);
}

export function captialize(input) {
    return input.toUpperCase()
}

export function formatDate(input) {
    return new Date(input).toLocaleString()
}