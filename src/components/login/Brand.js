import "./login.css"

export default function Brand() {
    return (
        <div className="col-lg-5 d-flex align-items-center brand-section p-5">
            <div className="text-center">
                <div class="logo-box mb-4">
                    <i class="bi bi-graph-up-arrow"></i>
                </div>
                <h2 className="fw-bold">Trade Ledger</h2>
                <p class="opacity-75 mt-3">
                    Build your trading journal, monitor performance,
                    discover winning strategies and grow consistently.
                </p>
                {/* <img src="https://cdn-icons-png.flaticon.com/512/2936/2936886.png"
                    className="img-fluid mt-3" style={{ maxWidth: "220px" }} /> */}
                <div class="mt-5 text-start">
                    <p><i class="bi bi-check-circle-fill me-2"></i>Trade Journal</p>
                    <p><i class="bi bi-check-circle-fill me-2"></i>P&L Analytics</p>
                    <p><i class="bi bi-check-circle-fill me-2"></i>Performance Reports</p>
                    <p><i class="bi bi-check-circle-fill me-2"></i>Secure Cloud Storage</p>
                </div>
            </div>
        </div>
    )
}