import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { ToastContainer } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../utils/Navbar";
import { formatDate, formattedCurrency } from "../utils/utils";
import { Line, Doughnut } from "react-chartjs-2";
import { getTradeStats } from "../../services/trade";
import Filter from "../utils/Filter";
import "./dashboard.css";
import SideNav from "../utils/SideNav";

export default function Dashboard(props) {
    const { user, logout, selectedAccId, accountList } = useAuth();
    const [selectedAccount, setSelectedAccount] = useState();
    const [statData, setStatData] = useState()
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "P&L",
                data: [],
                borderColor: "#0d6efd",
                backgroundColor: "rgba(13,110,253,0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    });
    const [donutData, setDonutData] = useState({
        labels: ["Winning", "Losing"],
        datasets: [
            {
                data: [],
                backgroundColor: ["#198754", "#dc3545"],
            },
        ],
    })
    const [currentBal, setCurrentBal] = useState();
    const [filterData, setFilterData] = useState();

    const options = {
        chart: {
            title: "Trading Performance",
            subtitle: "PnL",
        },
    };

    const get = async () => {
        const payload = { user_id: user._id, account_id: selectedAccId, filter: filterData };
        const res = await getTradeStats(payload);
        const labels = []
        const datasets = []
        let win = 0;
        let totalWinPnl = 0;
        let totalLosingPnl = 0;
        const total = res?.data?.length || 0
        let currentBal = 0;
        console.log(res)
        res?.data?.map((item, i) => {
            const days = formatDate(item.open_time).date
            if (item.pnl > 0) {
                win += 1
                totalWinPnl += (item.pnl)
            } else {
                totalLosingPnl += Math.abs(item.pnl)
            }
            labels.push(days);
            datasets.push(item.total)
            if (i === res.data.length - 1) {
                currentBal = item.total;
            }
        })
        setStatData(prev => ({
            win,
            lose: total - win,
            totalTrades: total,
            currentBal,
            winRate: `${((win / total) * 100).toFixed(2) || 0}%`,
            riskReward: `1: ${(totalWinPnl / totalLosingPnl).toFixed(1)}`
        }
        ))
        setDonutData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: [win, total - win] }] }))
        setChartData(prev => ({ ...prev, labels: labels, datasets: [{ ...prev.datasets[0], data: datasets }] }))
    }

    useEffect(() => {
        const found = accountList.find(account => account._id === selectedAccId)
        setSelectedAccount(found)
    }, [accountList, selectedAccId]);

    useEffect(() => {
        get();
    }, [selectedAccId, filterData]);

    return <>
        {
            accountList.length < 1 ?
                (<div className="alert alert-info mt-4" role="alert">
                    No account selected. Go to to accounts page and create one.
                </div>) :
                <>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>Dashboard</h2>
                    </div>
                    <Filter {...{ filterData, setFilterData }} />
                    <div className="row g-3">
                        <div className="col-md-3">
                            <div className="card p-3">
                                <div>Total P&L</div>
                                <div className="stat text-success">{formattedCurrency(statData?.currentBal, selectedAccount?.curr || 'inr')}</div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card p-3">
                                <div>Win Rate</div>
                                <div className="stat text-primary">{statData?.winRate}</div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card p-3">
                                <div>Risk/Reward</div>
                                <div className="stat">{statData?.riskReward}</div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card p-3">
                                <div>Total Trades</div>
                                <div className="stat">{statData?.totalTrades}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 mt-2">
                        <div className="col-lg-8">
                            <div className="card p-3">
                                <h5>Equity Curve</h5>
                                <div style={{ height: "350px" }}>
                                    <Line data={chartData} options={options} />
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card p-3">
                                <h5>Win vs Loss</h5>
                                <div style={{ height: "350px" }}>
                                    <Doughnut data={donutData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        }
        <ToastContainer autoClose={1000} />
    </>
}