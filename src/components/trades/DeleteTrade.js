import { useAuth } from "../../hooks/useAuth";
import { toast } from 'react-toastify';
import { remove } from "../../services/trade";

export default function DeleteTrade(props) {
    const { id, account_id, sync, setSync, name } = props
    const { user } = useAuth();
    const deleteAccountHandler = async () => {
        const res = await remove({ user_id: user._id, account_id, trade_id: id });
        setSync(!sync)
        toast[res.type](res.message);
        document.querySelector("#del_trade .btn-close").click();
    }
    return (
        <div className="modal fade" id="del_trade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <b>{name}</b>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={deleteAccountHandler}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}