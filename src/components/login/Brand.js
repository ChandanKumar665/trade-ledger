import "./login.css"

export default function Brand() {
    return (
        <div className="col-lg-5 d-flex align-items-center brand-section p-5">
            <div className="text-center">
                <div className="logo-box mb-4">
                    <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h2 className="fw-bold">Trade Ledger</h2>
                <p className="opacity-75 mt-3">
                    Build your trading journal, monitor performance,
                    discover winning strategies and grow consistently.
                </p>
                {/* <img src="https://cdn-icons-png.flaticon.com/512/2936/2936886.png"
                    classNameName="img-fluid mt-3" style={{ maxWidth: "220px" }} /> */}
                <div className="mt-5 text-start">
                    <p><i className="bi bi-check-circle-fill me-2"></i>Trade Journal</p>
                    <p><i className="bi bi-check-circle-fill me-2"></i>P&L Analytics</p>
                    <p><i className="bi bi-check-circle-fill me-2"></i>Performance Reports</p>
                    <p><i className="bi bi-check-circle-fill me-2"></i>Secure Cloud Storage</p>
                </div>
            </div>
        </div>
    )
}