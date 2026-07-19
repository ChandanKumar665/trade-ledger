import Navbar from "../utils/Navbar";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { getTradeList } from '../../services/trade'
import { formatDate, formattedCurrency } from "../utils/utils";
import AddUpdateTrade from "./AddUpdateTrade";
import DeleteTrade from "./DeleteTrade";
import Actions from "../utils/Actions";
import Filter from "../utils/Filter";

export default function Trades() {
    const { user, logout, selectedAccId } = useAuth();
    const navigate = useNavigate();
    const thead = [{ name: 'Symbol' }, { name: 'Type' }, { name: 'Entry Time' }, { name: 'Exit Time' },
    { name: 'Entry Price' }, { name: 'Exit Price' }, { name: 'PnL' }, { name: 'Actions' }]
    const [data, setData] = useState([])
    const [sync, setSync] = useState(false);
    const [deleteOps, setDeleteOps] = useState({});
    const [editOps, setEditOps] = useState({});

    const start = new Date();
    const end = new Date();
    start.setUTCDate(end.getUTCDate() - 7);//7 days before

    const [filterData, setFilterData] = useState({
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
    });


    const get = async () => {
        const res = await getTradeList({ user_id: user._id, account_id: selectedAccId, filter: filterData });
        if (res?.statusCode === 200) {
            setData(res.data)
        }
        return toast[res.type](res.message);
    }
    const delTrade = (input) => {
        setDeleteOps(prev => ({ ...prev, ...input }))
    }
    const editTrade = (input) => {
        setEditOps(prev => ({ ...prev, ...input }))
    }
    useEffect(() => {
        get()
    }, [sync, selectedAccId, filterData]);

    return <>
        <Navbar active_id='th' />
        <Filter {...{ filterData, setFilterData }} />
        <div className="mb-2">
            <AddUpdateTrade {...{ ...editOps, setEditOps, sync, setSync }} />
        </div>
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {
                            thead.map((item, i) => <th key={i} scope="col">{item.name}</th>)
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, i) => {
                            const removeProps = {
                                handler: delTrade,
                                modal_id: 'del_trade',
                                params: { id: item._id, account_id: item.account_id, name: `${item.symbol}-${item.order_type}` }
                            }
                            const editProps = {
                                handler: editTrade,
                                modal_id: 'add_up_trade',
                                params: {
                                    ...item,
                                    id: item._id,
                                    edit: true
                                }
                            }
                            const viewProps = {
                                handler: editTrade,
                                modal_id: 'add_up_trade',
                                params: {
                                    ...item,
                                    id: item._id,
                                    view: true
                                }
                            }
                            const curr = item.curr[0].curr
                            const open = formatDate(item.open_time)
                            const close = formatDate(item.close_time)
                            return (
                                <tr key={i}>
                                    <td>{item.symbol}</td>
                                    <td>{item.order_type}</td>
                                    <td>
                                        <span>{open.date}</span><br></br>
                                        <span>{open.time}</span>
                                    </td>
                                    <td>
                                        <span>{close.date}</span><br></br>
                                        <span>{close.time}</span>
                                    </td>
                                    <td>{item.entry_price}</td>
                                    <td>{item.exit_price}</td>
                                    <td>{`${formattedCurrency(item.pnl, curr)}`}</td>
                                    <td>
                                        <Actions
                                            view={viewProps}
                                            edit={editProps}
                                            remove={removeProps}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>
            <ToastContainer autoClose={1000} />
            <DeleteTrade {...{ ...deleteOps, sync, setSync }} />
        </div>
    </>
}
