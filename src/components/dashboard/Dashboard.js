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
        <Navbar active_id='dbh' />
        {
            accountList.length < 1 ?
                (<div className="alert alert-info mt-4" role="alert">
                    No account selected. Go to to accounts page and create one.
                </div>) :
                <>
                    <Filter {...{ filterData, setFilterData }} />
                    <div className="mb-2">
                        <div className="border border-dark rounded border-1 mb-2 p-2">
                            <p>Summary</p>
                            <span className="fw-light text-muted">Initial Balance:&nbsp;</span>
                            <span className="fw-bold">{
                                formattedCurrency(selectedAccount?.initial_cap, selectedAccount?.curr || 'inr')
                            }</span>
                            <p>
                                <span className="fw-light text-muted">Total PnL:&nbsp;</span>
                                <span className="fw-bold">{
                                    formattedCurrency(currentBal, selectedAccount?.curr || 'inr')
                                }</span>
                            </p>
                        </div>
                        <div className="container border border-dark rounded border-1 mb-2">
                            <Chart
                                chartType="Line"
                                width="100%"
                                height="400px"
                                data={statData}
                                options={options}
                            />
                        </div>
                        <div className="container border border-dark rounded border-1 mb-2">
                            Pie Chart Coming Soon
                        </div>
                    </div>
                </>
        }
        <ToastContainer autoClose={1000} />
    </>
}