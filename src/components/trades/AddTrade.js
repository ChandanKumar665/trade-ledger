import Navbar from "../utils/Navbar"
export default function AddTrade() {
    return <>
        <div>
            <Navbar active_id='adtr' />
            <div className="mt-3">
                <form>
                    <div className="mb-3">
                        <label class="form-label">Symbol</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Order Type</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label className="form-check-label" for="exampleCheck1">Open</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3 ">
                        <label className="form-check-label" for="exampleCheck1">Close</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3 ">
                        <label className="form-check-label" for="exampleCheck1">Qty</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3 ">
                        <label className="form-check-label" for="exampleCheck1">PnL</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3 ">
                        <label className="form-check-label" for="exampleCheck1">Charges</label>
                        <input type="text" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </>
}