import { useEffect } from "react";
import "./style.css"

export default function Calendar() {

    const month = 6; // July
    const year = 2026;
    const calendar = document.getElementById("calendar");
    const tradeList = document.getElementById("tradeList");

    const firstDay = new Date(year, month, 1).getDay();
    console.log('f', firstDay)
    const totalDays = new Date(year, month + 1, 0).getDate();
    console.log('t', totalDays)

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
    const selectDay = (day) => {

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
    const PnlDayCard = (props) => {
        const pnl = 2000;
        const cls = pnl > 0 ? 'profit' : 'loss'
        return (
            <div className={`calendar-day ${cls}`}>
                <div class="date">{1}</div>
                <div class="amount">
                    {pnl === 0
                        ? "No Trade"
                        : `${pnl > 0 ? "+" : ""}₹${pnl.toLocaleString()}`
                    }
                </div>
                <small>

                    {tradeData[1] ? tradeData[1].length : 0} Trades

                </small>
            </div>
        )
    }
    useEffect(() => {
        // weekDays.forEach(day => {
        //     const div = document.createElement("div");
        //     div.className = "day-name";
        //     div.innerHTML = `<strong>${day}</strong>`;
        //     calendar.appendChild(div);
        // });

        // for (let i = 0; i < firstDay; i++) {
        //     const empty = document.createElement("div");
        //     calendar.appendChild(empty);
        // }

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

            // calendar.appendChild(card);

        }
    }, [])

    return (
        <>
            <main class="">

                {/* <!-- Header --> */}

                <div class="page-header">

                    <div>

                        <h2>

                            Calendar P&L

                        </h2>

                        <p>

                            Daily Trading Performance

                        </p>

                    </div>

                    <div class="header-actions">

                        <select class="form-select">

                            <option>All Accounts</option>

                        </select>

                        <button class="btn btn-primary">

                            Today

                        </button>

                    </div>

                </div>

                {/* <!-- KPI Cards --> */}

                <div class="row g-4">

                    <div class="col-lg-2 col-md-4">

                        <div class="summary-card">

                            <small>Net P&L</small>

                            <h3 class="profit-text">+₹1,24,580</h3>

                            <span>+18%</span>

                        </div>

                    </div>

                    <div class="col-lg-2 col-md-4">

                        <div class="summary-card">

                            <small>Winning Days</small>

                            <h3>18</h3>

                        </div>

                    </div>

                    <div class="col-lg-2 col-md-4">

                        <div class="summary-card">

                            <small>Losing Days</small>

                            <h3>7</h3>

                        </div>

                    </div>

                    <div class="col-lg-2 col-md-4">

                        <div class="summary-card">

                            <small>Win Rate</small>

                            <h3>72%</h3>

                        </div>

                    </div>

                    <div class="col-lg-2 col-md-4">

                        <div class="summary-card">

                            <small>Avg RR</small>

                            <h3>1 : 2.8</h3>

                        </div>

                    </div>

                    <div class="col-lg-2 col-md-4">

                        <div class="summary-card">

                            <small>Profit Factor</small>

                            <h3>2.15</h3>

                        </div>

                    </div>

                </div>

                {/* <!-- Calendar --> */}

                <div class="row mt-4">

                    <div class="col-lg-9">

                        <div class="card custom-card">

                            <div class="calendar-header">

                                <button class="btn btn-light">

                                    <i class="bi bi-chevron-left"></i>

                                </button>

                                <h4>

                                    July 2026

                                </h4>

                                <button class="btn btn-light">

                                    <i class="bi bi-chevron-right"></i>

                                </button>

                            </div>

                            <div id="calendar" class="calendar-grid">
                                {
                                    weekDays.map(day => <div className="day-name"><strong>{day}</strong></div>)
                                }
                                {
                                    Array(firstDay).fill('').map((item, i) => <div key={i}></div>)
                                }
                                {
                                    Array(totalDays).fill('').map((item, i) => <PnlDayCard />)
                                }
                            </div>

                        </div>

                    </div>

                    <div class="col-lg-3">

                        <div class="card custom-card h-100">

                            <h5>

                                Friday 17 July

                            </h5>

                            <h2 class="profit-text">

                                +₹5,800

                            </h2>

                            <hr />

                            <div class="stats">

                                <div>

                                    <strong>4</strong>

                                    <small>Trades</small>

                                </div>

                                <div>

                                    <strong>75%</strong>

                                    <small>Win</small>

                                </div>

                                <div>

                                    <strong>1:2.8</strong>

                                    <small>RR</small>

                                </div>

                            </div>

                            <hr />

                            <h6>

                                Trades

                            </h6>

                            <div id="tradeList">

                            </div>

                        </div>

                    </div>

                </div>

                {/* <!-- Chart --> */}

                {/* <div class="card custom-card mt-4">

                    <div class="d-flex justify-content-between">

                        <h5>

                            Daily P&L Trend

                        </h5>

                        <span class="badge bg-success">

                            +₹1,24,580

                        </span>

                    </div>

                    <canvas id="pnlChart" height="80"></canvas>

                </div> */}

            </main>
        </>)
}