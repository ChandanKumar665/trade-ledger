import { useEffect, useState } from "react";
import { create, update } from "../../services/accounts";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';

export default function AddUpdateAccount(props) {
    const { sync, setSync, edit, view, id, name, curr, initial_cap, setEditOps } = props
    const [data, setData] = useState({ curr: 'inr' });
    const { user, syncAccList, setSyncAccList } = useAuth();

    const modifyAccount = async () => {
        const res = await update({
            "name": data.name,
            "curr": data.curr,
            "initial_cap": data.initial_cap,
            "user_id": user._id,
            "account_id": id
        });
        toast[res.type](res.message);
        setSync(!sync)
        document.querySelector("#add_acc .btn-close").click();
    }
    const createAccount = async () => {
        const res = await create({
            "name": data.name,
            "curr": data.curr,
            "initial_cap": data.initial_cap,
            "user_id": user._id
        });
        toast[res.type](res.message);
        setSync(!sync)
        //updating context
        setSyncAccList(!syncAccList);
        document.querySelector("#add_acc .btn-close").click();
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (edit) {
            const isEqual = JSON.stringify({ name, initial_cap, curr }) === JSON.stringify({ name: data.name, initial_cap: data.initial_cap, curr: data.curr })
            if (!isEqual) {
                return modifyAccount()
            }
            toast['info']('Update at least one field');
        } else {
            createAccount();
        }
    }
    const onModalClose = (e) => {
        //reset all edit props
        setEditOps({})
        setData({ curr: 'inr' })
    }

    const onChangeHandler = (key, val) => {
        setData(prev => ({ ...prev, [key]: val }))
    }

    useEffect(() => {
        const modalEl = document.getElementById("add_acc")
        modalEl?.addEventListener('hidden.bs.modal', onModalClose)
        return () => {
            modalEl.removeEventListener("hidden.bs.modal", () => { });
        };
    }, []);

    useEffect(() => {
        if (edit || view) {
            setData(prev => ({ name, initial_cap, curr }))
        }
    }, [edit, view]);

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add_acc">
                Add Account +
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="add_acc" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Account</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formSubmitHandler}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text"
                                        className="form-control"
                                        name="name"
                                        value={data.name || ''}
                                        disabled={view}
                                        onChange={(e) => onChangeHandler('name', e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Currency</label>
                                    <select className="form-select" disabled={view} onChange={(e) => onChangeHandler('curr', e.target.value)}>
                                        <option value='inr' selected={curr === 'inr'}>INR (₹)</option>
                                        <option value='usd' selected={curr === 'usd'}>USD ($)</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Initial Capital</label>
                                    <input type="number" className="form-control"
                                        name="initial_cap"
                                        value={data.initial_cap || ''}
                                        disabled={view}
                                        onChange={(e) => onChangeHandler('initial_cap', e.target.value)}
                                    />
                                </div>
                                {!view && <button type="submit" className="btn btn-primary">Submit</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}