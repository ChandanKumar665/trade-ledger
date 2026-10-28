import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { ToastContainer } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";
import { getTradeStats } from "../../services/trade";
import Filter from "../utils/Filter";
import { formatDate2, formattedCurrency } from "../utils/utils";
import "./dashboard.css";
import MetricCard from "../utils/MetricCard";

export default function Dashboard(props) {
    const { user, logout, selectedAccId, accountList, selectedAccount } = useAuth();
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
    const [isInitialBalIncluded, setIsInitialBalIncluded] = useState(false);
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
        total && res?.data?.map((item, i) => {
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

    const onChangeHandler = (e) => {
        setIsInitialBalIncluded(prev => e.target.checked)
    }
    useEffect(() => {
        get();
    }, [selectedAccId, filterData]);

    useEffect(() => {
        if (isInitialBalIncluded) {
            setStatData(prev => ({ ...prev, currentBal: prev?.currentBal + selectedAccount?.initial_cap }))
            setChartData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: [...prev.datasets[0].data].map(item => item + selectedAccount?.initial_cap) }] }))
        } else {
            setStatData(prev => ({ ...prev, currentBal: prev?.currentBal - selectedAccount?.initial_cap }))
            setChartData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: [...prev.datasets[0].data].map(item => item - selectedAccount?.initial_cap) }] }))

        }

    }, [isInitialBalIncluded, selectedAccId]);
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
                            <div className="col-12 col-sm-12 col-lg-12">
                                <div class="dashboard-card">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={onChangeHandler}
                                    />
                                    &nbsp;<label class="form-check-label" for="flexCheckChecked">
                                        <small class="text-muted">
                                            Include initial Balance  {formattedCurrency(selectedAccount?.initial_cap, selectedAccount?.curr || 'inr')}
                                        </small>
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-sm-6 col-lg-3">
                                <MetricCard
                                    label="Gross P&L"
                                    value={statData?.currentBal || 0}
                                    isCurrency={true}
                                    curr={selectedAccount?.curr}
                                />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <MetricCard
                                    label="Win Rate"
                                    value={statData?.winRate || 0}
                                />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <MetricCard
                                    label="Risk/Reward"
                                    value={statData?.riskReward || 0}
                                />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <MetricCard
                                    label="Total Trades"
                                    value={statData?.totalTrades || 0}
                                />
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