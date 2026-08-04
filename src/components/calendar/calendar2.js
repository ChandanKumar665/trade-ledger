const calendar = document.getElementById("calendar");
const tradeList = document.getElementById("tradeList");

const tradeData = {
    1: [
        { symbol: "BTCUSD", side: "Long", pnl: 2450, rr: "1:3" },
        { symbol: "ETHUSD", side: "Short", pnl: 1350, rr: "1:2" }
    ],

    2: [
        { symbol: "NIFTY", side: "CE", pnl: -850, rr: "-1R" }
    ],

    4: [
        { symbol: "BANKNIFTY", side: "PE", pnl: 5800, rr: "1:4" },
        { symbol: "BTCUSD", side: "Long", pnl: 2100, rr: "1:2" }
    ],

    7: [
        { symbol: "ETHUSD", side: "Short", pnl: 3400, rr: "1:5" }
    ],

    10: [
        { symbol: "CRUDE", side: "Buy", pnl: -1250, rr: "-1R" }
    ],

    15: [
        { symbol: "BTCUSD", side: "Long", pnl: 7600, rr: "1:6" }
    ],

    18: [
        { symbol: "NIFTY", side: "CE", pnl: 900, rr: "1:2" },
        { symbol: "ETHUSD", side: "Short", pnl: 1200, rr: "1:3" }
    ]
};

const month = 6; // July
const year = 2026;

const firstDay = new Date(year, month, 1).getDay();
const totalDays = new Date(year, month + 1, 0).getDate();

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

weekDays.forEach(day => {

    const div = document.createElement("div");
    div.className = "day-name";
    div.innerHTML = `<strong>${day}</strong>`;

    calendar.appendChild(div);

});

for (let i = 0; i < firstDay; i++) {

    const empty = document.createElement("div");
    calendar.appendChild(empty);

}

for (let day = 1; day <= totalDays; day++) {

    let pnl = 0;

    if (tradeData[day]) {

        pnl = tradeData[day].reduce((sum, t) => sum + t.pnl, 0);

    }

    let cls = "neutral";

    if (pnl > 0) cls = "profit";
    else if (pnl < 0) cls = "loss";

    const card = document.createElement("div");

    card.className = `calendar-day ${cls}`;

    card.dataset.day = day;

    card.innerHTML = `

        <div class="date">${day}</div>

        <div class="amount">

            ${pnl == 0
            ? "No Trade"
            : `${pnl > 0 ? "+" : ""}₹${pnl.toLocaleString()}`
        }

        </div>

        <small>

            ${tradeData[day] ? tradeData[day].length : 0} Trades

        </small>

    `;

    card.onclick = () => selectDay(day);

    calendar.appendChild(card);

}

function selectDay(day) {

    document.querySelectorAll(".calendar-day")
        .forEach(x => x.classList.remove("selected"));

    document
        .querySelector(`[data-day='${day}']`)
        .classList.add("selected");

    document.querySelector(".custom-card h5").innerHTML =
        `${day} July 2026`;

    const trades = tradeData[day] || [];

    let total = 0;

    tradeList.innerHTML = "";

    trades.forEach(trade => {

        total += trade.pnl;

        tradeList.innerHTML += `

            <div class="trade-item">

                <div class="d-flex justify-content-between">

                    <strong>${trade.symbol}</strong>

                    <span class="${trade.pnl >= 0 ? "profit-text" : "loss-text"}">

                        ${trade.pnl >= 0 ? "+" : ""}₹${trade.pnl}

                    </span>

                </div>

                <div class="text-muted">

                    ${trade.side}

                    •

                    RR ${trade.rr}

                </div>

            </div>

        `;

    });

    if (trades.length === 0) {

        tradeList.innerHTML = `

            <div class="text-center text-secondary py-5">

                No Trades

            </div>

        `;

    }

    document.querySelector(".custom-card h2").innerHTML =
        total == 0
            ? "₹0"
            : `${total > 0 ? "+" : ""}₹${total.toLocaleString()}`;

}

selectDay(1);