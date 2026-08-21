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

export function formatDate(input, format = 'MMM Do YYYY') {
    return { date: moment(input).format(format), time: moment(input).format('h:mm a') }
}

export function formatDate2(input, format = 'MMM Do YY') {
    return { date: moment(input).format(format) }
}

export function getInitials(name) {
    return name?.trim()
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase();
}

export function getMonthListForTheCurrentYear(count = 12) {
    const months = [];
    const now = new Date();
    for (let i = 0; i < count; i++) {
        const date = new Date(
            now.getFullYear(),
            now.getMonth() - i,
            1
        );

        months.push({
            label: date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
            }),
            value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
        });
    }
    return months;
}

export function getDaysInMonth(value) {
    const [year, month] = value.split("-").map(Number);
    return {
        firstDay: new Date(year, month - 1, 1).getDay(),
        totalDays: new Date(year, month, 0).getDate()
    }
}
export function getDataStatistics(data = []) {
    if (!data.length) {
        return ''
    }
    let win = 0;
    let totalWinPnl = 0;
    let totalPnl = 0;
    let totalLosingPnl = 0;
    const total = data?.length || 0
    const curr = data[0].curr
    let currentBal = 0;
    data?.map((item, i) => {
        const days = formatDate2(item.open_time).date
        totalPnl += item.pnl
        if (item.pnl > 0) {
            win += 1
            totalWinPnl += (item.pnl)
        } else {
            totalLosingPnl += Math.abs(item.pnl)
        }
    })
    return {
        win,
        totalPnl: formattedCurrency(totalPnl, curr),
        lose: total - win,
        totalWinPnl,
        totalLosingPnl,
        profitFactor: (totalWinPnl / totalLosingPnl).toFixed(2),
        winRate: `${((win / total) * 100).toFixed(2) || 0}%`,
        riskReward: `1: ${(totalWinPnl / totalLosingPnl).toFixed(1)}`,
        ...formatPnl(totalPnl)
    }
}
export function formatPnl(pnl) {
    let cls, sign = '', bg = ''
    if (pnl > 0) {
        cls = 'profit-text'
        bg = 'profit'
        sign = "+"
    } else if (pnl < 0) {
        cls = 'loss-text'
        bg = 'loss'
    } else {
        cls = 'neutral'
        bg = 'neutral'
    }
    return { cls, sign, bg };
}