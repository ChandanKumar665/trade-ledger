import Navbar from "../utils/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { formatDate, formattedCurrency } from "../utils/utils";
import { ToastContainer } from 'react-toastify';

import { getTradeStats } from "../../services/trade";
import Filter from "../utils/Filter";

export default function Dashboard(props) {
    const { user, logout, selectedAccId, accountList } = useAuth();
    const [selectedAccount, setSelectedAccount] = useState();
    const [statData, setStatData] = useState();
    const [currentBal, setCurrentBal] = useState();
    const [filterData, setFilterData] = useState();

    const options = {
        chart: {
            title: "Trading Performance",
            subtitle: "PnL",
        },
    };

    const get = async () => {
        const data = [
            ["Date", "PnL"]
        ];
        const payload = { user_id: user._id, account_id: selectedAccId, filter: filterData };
        const res = await getTradeStats(payload);
        res?.data?.map((item, i) => {
            const y = formatDate(item.open_time).date
            const x = [y, item.total]
            data.push(x)
            if (i === res.data.length - 1) {
                setCurrentBal(item.total);
            }
        })
        setStatData(data)
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