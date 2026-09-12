import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { ToastContainer } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";
import { getTradeStats } from "../../services/trade";
import Filter from "../utils/Filter";
import { formatDate2, formattedCurrency } from "../utils/utils";
import "./dashboard.css";

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
        const payload = { account_id: selectedAccId, filter: filterData };
        const res = await getTradeStats(payload);
        const labels = []
        const datasets = []
        let win = 0;
        let totalWinPnl = 0;
        let totalLosingPnl = 0;
        const total = res?.data?.length || 0
        let currentBal = 0;
        res?.data?.map((item, i) => {
            const days = formatDate2(item.open_time).date
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
                    <div class="section-header justify-content-between align-items-center mb-3">
                        <h4 class="mb-1 fw-bold">Dashboard</h4>
                        <small class="text-muted">
                            Overview of your trading performance
                        </small>
                    </div>
                    <div className="">
                        <Filter {...{ filterData, setFilterData }} />
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="dashboard-card">
                                    <small className="text-muted">
                                        Total P&L
                                    </small>
                                    <h3 className="text-success mt-2">
                                        {formattedCurrency(statData?.currentBal, selectedAccount?.curr || 'inr')}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="dashboard-card">
                                    <small className="text-muted">
                                        Win Rate
                                    </small>
                                    <h3 className="text-primary mt-2">
                                        {statData?.winRate}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="dashboard-card">
                                    <small className="text-muted">
                                        Risk/Reward
                                    </small>
                                    <h3 className="mt-2">
                                        {statData?.riskReward}
                                    </h3>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="dashboard-card">
                                    <small className="text-muted">
                                        Total Trades
                                    </small>
                                    <h3 className="mt-2">
                                        {statData?.totalTrades}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-lg-8">
                                <div className="dashboard-card">
                                    <h6 className="fw-bold mb-1">Equity Curve</h6>
                                    <div style={{ height: "350px" }}>
                                        <Line data={chartData} options={options} />
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="dashboard-card">
                                    <h6 className="fw-bold mb-1">Win vs Loss</h6>
                                    <div style={{ height: "350px" }}>
                                        <Doughnut data={donutData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        }
        <ToastContainer autoClose={1000} />
    </>
}