import Navbar from "../utils/Navbar";
import { useAuth } from "../../hooks/useAuth"
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { getAccountList } from "../../services/accounts";
import { captialize, formattedCurrency } from "../utils/utils";
import AddUpdateAccount from "./AddUpdateAccount";
import DeleteAccount from "./DeleteAccount";
import Actions from "../utils/Actions";


export default function Accounts() {
    const { user, logout } = useAuth();
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
    }, [sync])

    return <>
        <Navbar active_id='acc' />
        <div className="mb-2">
            <AddUpdateAccount {...{ ...editOps, setEditOps, sync, setSync }} />
        </div>
        <div className="">
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
                            return (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{captialize(item.curr)}</td>
                                    <td>{`${formattedCurrency(item.initial_cap, item.curr)}`}</td>
                                    <td>{item?.createdAt}</td>
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
            <DeleteAccount {...{ ...deleteOps, sync, setSync }} />

        </div>
    </>

}