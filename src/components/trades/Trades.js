import Navbar from "../utils/Navbar";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { useEffect } from "react";
import { getTradeList } from '../../services/trade'

export default function Trades() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const thead = [{ name: 'Symbol' }, { name: 'Order Type' }, { name: 'Open' }, { name: 'Close' }, { name: 'Qty' }, { name: 'PnL' }]
    const data = [{ name: 'BTC', order_type: 'sell', open: '29/06/2026' }, { name: 'BTC', order_type: 'sell', open: '28/06/2026' }]
    useEffect(() => {
        if (user) {
            // await getTradeList({ user_id: user._id, account_id: '' })
        }
    }, [])
    console.log(user)

    return <>
        <Navbar active_id='th' />
        <br></br>
        <div><a className="btn btn-primary" href="/trades/add">Add Trades +</a></div>
        <div>
            Trade list
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
                        data.map((item, i) => (
                            <tr key={i}>
                                <th scope="row">{item.name}</th>
                                <td>{item.order_type}</td>
                                <td>{item.open}</td>
                                <td>{item?.close}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    </>
}