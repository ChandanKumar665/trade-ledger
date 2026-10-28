import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCalendarTradeStats, getTradeStats } from "../../services/trade";
import { getDataStatistics, getDaysInMonth, getMonthListForTheCurrentYear } from "../utils/utils";
import "./calendar.css";
import PnlDayCard from "./PnlCard";
import TradeSummary from "./TradeSummary";
import MetricCard from "../utils/MetricCard";

export default function Calendar() {
    const { selectedAccId, selectedAccount } = useAuth();
    const months = getMonthListForTheCurrentYear();
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [searchQuery, setSearchQuery] = useState(prepareQuery(months[0].value));
    const [calendarProps, setCalendarProps] = useState(getDaysInMonth(months[0].value));
    const [tradesData, setTradesData] = useState([]);
    const [slectedCalendarDayProps, setSlectedCalendarDayProps] = useState({
        selectedDay: ''
    });
    const [stats, setStats] = useState();
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function prepareQuery(value) {
        if (!value) {
            return;
        }
        const [year, month] = value.split("-").map(Number);
        const start = `${year}-${String(month).padStart(2, "0")}-01`;
        const lastDay = new Date(year, month, 0).getDate();
        const end = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
        return { start, end };
    }
    const handleMonthChange = (e) => {
        const value = e.target.value;
        setSelectedMonth(months.find(mon => mon.value === value));
        setSearchQuery(prepareQuery(value));
        setCalendarProps(getDaysInMonth(value));
    }
    const searchTrades = async () => {
        const payload = { account_id: selectedAccId, filter: searchQuery };
        const res = await getCalendarTradeStats(payload);
        setTradesData(res.data)
    }

    useEffect(() => {
        setSlectedCalendarDayProps({ selectedDay: '' });
        searchTrades();
    }, [searchQuery, selectedAccId]);

    useEffect(() => {
        const stat = getDataStatistics(tradesData, selectedAccount.curr)
        setStats(stat)
    }, [tradesData]);
    return (
        <>
            <main class="">
                <div className="section-header justify-content-between align-items-center mb-3">
                    <div className="row g-3">
                        <div className="col-md-6 col-lg-6">
                            <h4 className="mb-1 fw-bold">Calendar P&L</h4>
                            <small className="text-muted">
                                Daily Trading Performance
                            </small>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="header-actions">
                                <i className="bi bi-calendar3" />
                                <select
                                    className="form-select"
                                    value={selectedMonth.value}
                                    onChange={handleMonthChange}
                                >
                                    {months.map((month) => (
                                        <option
                                            key={month.value}
                                            value={month.value}
                                        >
                                            {month.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- KPI Cards --> */}

                <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <MetricCard
                            label='Net P&L'
                            value={stats?.totalPnl || 0}
                            isCurrency={true}
                            curr={selectedAccount.curr}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <MetricCard
                            label='Winning Days'
                            value={stats?.win || 0}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <MetricCard
                            label='Losing Days'
                            value={stats?.lose || 0}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <MetricCard
                            label='Win Rate'
                            value={stats?.winRate || 0}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <MetricCard
                            label='Avg RR'
                            value={stats?.riskReward || 0}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <MetricCard
                            label='Profit Factor'
                            value={stats?.profitFactor || 0}
                        />
                    </div>
                </div>

                {/* <!-- Calendar --> */}

                <div className="row g-3 mb-3">
                    <div className="col-lg-12">
                        <div className="dashboard-card">
                            <div className="calendar-header">
                                <button className="btn btn-light" disabled>
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <h4>
                                    {selectedMonth?.label}
                                </h4>
                                <button className="btn btn-light" disabled>
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                            <div id="calendar" className="calendar-grid">
                                {
                                    weekDays.map(day => <div className="day-name"><strong>{day}</strong></div>)
                                }
                                {
                                    Array(calendarProps.firstDay).fill('').map((item, i) => <div key={i}></div>)
                                }
                                {
                                    Array(calendarProps.totalDays).fill('').map((item, i) =>
                                        <PnlDayCard
                                            key={i + 1}
                                            day={i + 1}
                                            {...{
                                                tradesData,
                                                slectedCalendarDayProps,
                                                setSlectedCalendarDayProps,
                                                selectedMonth
                                            }}
                                        />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    slectedCalendarDayProps && (
                        <div className="row g-3">
                            <div className="col-lg-12">
                                <TradeSummary slectedCalendarDayProps={slectedCalendarDayProps} />
                            </div>
                        </div>

                    )
                }

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