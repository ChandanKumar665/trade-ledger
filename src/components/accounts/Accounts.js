import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../hooks/useAuth";
import { getAccountList } from "../../services/accounts";
import Actions from "../utils/Actions";
import { captialize, formatDate, formattedCurrency } from "../utils/utils";
import AddUpdateAccount from "./AddUpdateAccount";
import DeleteAccount from "./DeleteAccount";


export default function Accounts() {
    const { user } = useAuth();
    const thead = [{ name: 'Name' }, { name: 'Currency' }, { name: 'Initial Cap' }, { name: 'Created' }, { name: 'Action' }]
    const [data, setData] = useState([]);
    const [sync, setSync] = useState(false);
    const [deleteOps, setDeleteOps] = useState({});
    const [editOps, setEditOps] = useState({})

    const get = async () => {
        const res = await getAccountList({ user_id: user._id });
        if (res?.statusCode === 200) {
            setData(res.data)
        }
        return toast[res.type](res.message);
    }

    const delAcc = (input) => {
        setDeleteOps(prev => ({ ...prev, ...input }))
    }
    const editAccount = (input) => {
        setEditOps(prev => ({ ...prev, ...input }))
    }

    useEffect(() => {
        if (user) {
            get()
        }
    }, [sync, user])

    return (
        <>

            <div class="section-header justify-content-between align-items-center mb-3">
                <h4 class="mb-1 fw-bold">Accounts</h4>
                <small class="text-muted">
                    Create multiple portfolio accounts
                </small>
            </div>
            <div className="trade-table-card">
                <div className="p-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                        <AddUpdateAccount {...{ ...editOps, setEditOps, setSync }} />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover mb-0 trade-table">
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
                                        handler: delAcc,
                                        modal_id: 'del_acc',
                                        params: { id: item._id, name: item.name }
                                    }
                                    const editProps = {
                                        handler: editAccount,
                                        modal_id: 'add_acc',
                                        params: { id: item._id, name: item.name, curr: item.curr, initial_cap: item.initial_cap, edit: true }
                                    }
                                    const viewProps = {
                                        handler: editAccount,
                                        modal_id: 'add_acc',
                                        params: { id: item._id, name: item.name, curr: item.curr, initial_cap: item.initial_cap, view: true }
                                    }
                                    const createdOn = formatDate(item?.createdAt)
                                    return (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{captialize(item.curr)}</td>
                                            <td>{`${formattedCurrency(item.initial_cap, item.curr)}`}</td>
                                            <td>{createdOn?.date}</td>
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
                </div>
            </div>

            <ToastContainer autoClose={1000} />
            <DeleteAccount {...{ ...deleteOps, setSync }} />
        </>
    )
}