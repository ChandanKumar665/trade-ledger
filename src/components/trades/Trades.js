import Navbar from "../utils/Navbar";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { getTradeList } from '../../services/trade'
import { formattedCurrency } from "../utils/utils";
import AddUpdateTrade from "./AddUpdateTrade";
import DeleteTrade from "./DeleteTrade";
import Actions from "../utils/Actions";

export default function Trades() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const thead = [{ name: 'Symbol' }, { name: 'Order Type' }, { name: 'Open' }, { name: 'Close' },
    { name: 'Qty' }, { name: 'PnL' }, { name: 'Actions' }]
    const [data, setData] = useState([])
    const [sync, setSync] = useState(false);
    const [deleteOps, setDeleteOps] = useState({});
    const [editOps, setEditOps] = useState({})
    const get = async (input) => {
        const res = await getTradeList(input);
        console.log('r', res)
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
        if (user) {
            get({ user_id: user._id, account_id: '6a34360f3e5608da716decd4' })
        }
    }, [sync])

    return <>
        <Navbar active_id='th' />
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
                            return (
                                <tr key={i}>
                                    <td>{item.symbol}</td>
                                    <td>{item.order_type}</td>
                                    <td>{item.open_time}</td>
                                    <td>{item?.close_time}</td>
                                    <td>{item.qty}</td>
                                    <td>{`${formattedCurrency(item.pnl, 'inr')}`}</td>
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
