import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { create, update } from "../../services/trade";

export default function AddUpdateTrade(props) {
    const { sync, setSync, edit, view, account_id, id, symbol, order_type, desc, open_time,
        close_time, entry_price, exit_price, qty, pnl, charges, setEditOps } = props
    const [data, setData] = useState({ order_type: 'buy' });
    const { user, selectedAccId } = useAuth();

    const reset = () => {
        setData({ order_type: 'buy' })
    }
    const modifyTrade = async () => {
        const payload = {
            symbol: data.symbol,
            order_type: data.order_type,
            desc: data.desc,
            open_time: data.open_time,
            close_time: data.close_time,
            entry_price: data.entry_price,
            exit_price: data.exit_price,
            qty: data.qty,
            pnl: data.pnl,
            charges: data.charges,
            account_id,
            "user_id": user._id,
            "trade_id": id
        }
        const res = await update(payload);
        toast[res.type](res.message);
        setSync(!sync)
        document.querySelector("#add_up_trade .btn-close").click();
        reset();
    }
    const createTrade = async () => {
        const payload = {
            "symbol": data.symbol,
            "order_type": data.order_type,
            "desc": data.desc,
            "open_time": data.open_time,
            "close_time": data.close_time,
            "entry_price": data.entry_price,
            "exit_price": data.exit_price,
            "qty": data.qty,
            "pnl": data.pnl,
            "charges": data.charges,
            "account_id": selectedAccId,
            "user_id": user._id
        }
        const res = await create(payload);
        toast[res.type](res.message);
        setSync(!sync)
        document.querySelector("#add_up_trade .btn-close").click();
        reset();
    }
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (edit) {
            const initialData = JSON.stringify({
                symbol,
                order_type,
                desc,
                open_time,
                close_time,
                entry_price,
                exit_price,
                qty,
                pnl,
                charges
            });
            const modifiedData = JSON.stringify({
                symbol: data.symbol,
                order_type: data.order_type,
                desc: data.desc,
                open_time: data.open_time,
                close_time: data.close_time,
                entry_price: data.entry_price,
                exit_price: data.exit_price,
                qty: data.qty,
                pnl: data.pnl,
                charges: data.charges
            })

            const isEqual = initialData === modifiedData;
            if (!isEqual) {
                return modifyTrade()
            }
            toast['info']('Update at least one field');
        } else {
            createTrade()
        }
    }
    const onChangeHandler = (key, val) => {
        setData(prev => ({ ...prev, [key]: val }))
    }
    const onModalClose = (e) => {
        //reset all edit props
        setEditOps({})
        setData({ order_type: 'buy' })
    }
    useEffect(() => {
        const modalEl = document.getElementById("add_up_trade")
        modalEl?.addEventListener('hidden.bs.modal', onModalClose)
        return () => {
            modalEl.removeEventListener("hidden.bs.modal", () => { });
        };
    }, [onModalClose]);

    useEffect(() => {
        const { order_type, entry_price, exit_price, qty } = data
        const pnl = order_type === 'buy' ? (exit_price - entry_price) * qty : (entry_price - exit_price) * qty
        setData(prev => ({ ...prev, pnl: parseFloat(pnl).toFixed(2) }))
    }, [data, data.order_type, data.entry_price, data.exit_price, data.qty]);

    useEffect(() => {
        if (edit || view) {
            setData(prev => ({
                id, symbol, order_type, desc, open_time,
                close_time, entry_price, exit_price, qty, pnl, charges
            }))
        }
    }, [edit, view])
    return <>
        {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_up_trade">
            Add Trades +
        </button>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="add_up_trade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{edit ? 'Update Trade' : 'Add Trade'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={formSubmitHandler}>
                            <div className="mb-3">
                                <label className="form-label">Symbol:<span style={{ color: 'red' }}>*</span></label>
                                <input type="text"
                                    className="form-control"
                                    name="symbol"
                                    disabled={view}
                                    value={data.symbol || ''}
                                    onChange={(e) => onChangeHandler('symbol', e.target.value)} />

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Order Type:<span style={{ color: 'red' }}>*</span></label>
                                <select
                                    className="form-select"
                                    disabled={view}
                                    onChange={(e) => onChangeHandler('order_type', e.target.value)}>
                                    <option value='buy' selected={data.order_type === 'buy'}>BUY </option>
                                    <option value='sell' selected={data.order_type === 'sell'}>SELL</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Desc</label>
                                <input type="text" className="form-control"
                                    name="desc"
                                    disabled={view}
                                    value={data.desc || ''}
                                    onChange={(e) => onChangeHandler('desc', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Entry Time:<span style={{ color: 'red' }}>*</span></label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    name="open_time"
                                    disabled={view}
                                    value={data.open_time || ''}
                                    onChange={(e) => onChangeHandler('open_time', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Exit Time:<span style={{ color: 'red' }}>*</span></label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    name="close_time"
                                    disabled={view}
                                    value={data.close_time || ''}
                                    onChange={(e) => onChangeHandler('close_time', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Entry Price:<span style={{ color: 'red' }}>*</span></label>
                                <input type="text" className="form-control"
                                    name="entry_price"
                                    disabled={view}
                                    value={data.entry_price || ''}
                                    onChange={(e) => onChangeHandler('entry_price', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Exit Price:<span style={{ color: 'red' }}>*</span></label>
                                <input type="text" className="form-control"
                                    name="exit_price"
                                    disabled={view}
                                    value={data.exit_price || ''}
                                    onChange={(e) => onChangeHandler('exit_price', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Qty:<span style={{ color: 'red' }}>*</span></label>
                                <input type="number" className="form-control"
                                    name="qty"
                                    disabled={view}
                                    value={data.qty || ''}
                                    onChange={(e) => onChangeHandler('qty', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">PnL</label>
                                <input type="number" className="form-control"
                                    name="pnl"
                                    disabled={true}
                                    value={data.pnl || 0}
                                    onChange={(e) => onChangeHandler('pnl', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Charges</label>
                                <input type="number" className="form-control"
                                    name="charges"
                                    disabled={view}
                                    value={data.charges || ''}
                                    onChange={(e) => onChangeHandler('charges', e.target.value)}
                                />
                            </div>
                            {
                                !view && <button type="submit" className="btn btn-primary">Submit</button>
                            }

                        </form>
                    </div>
                    {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                </div>
            </div>
        </div>
    </>
}