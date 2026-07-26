import Login from "../login/Login";
import Navbar from "../utils/Navbar";

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1>
                                Track Every Trade.<br />
                                Grow Every Day.
                            </h1>
                            <p className="mt-4">
                                Analyze your trading performance, manage accounts,
                                review statistics, and build consistency with a professional
                                trading journal.
                            </p>

                            <button className="btn btn-login btn-lg mt-3 px-4">
                                <NavLink className="nav-item nav-link" to='/login'>Get Started</NavLink>
                            </button>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=900"
                                className="img-fluid" />

                        </div>
                    </div>

                </div>
            </section>
            <hr />
            {/* //feature */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5">
                        Features
                    </h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card feature-card shadow-sm">
                                <div className="card-body text-center">
                                    <div className="icon">📊</div>
                                    <h4 className="mt-3">
                                        Trade Analytics
                                    </h4>
                                    <p>
                                        Monitor your win rate, risk-reward ratio and equity curve.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card feature-card shadow-sm">
                                <div className="card-body text-center">
                                    <div className="icon">💰</div>
                                    <h4 className="mt-3">
                                        Manage Accounts
                                    </h4>
                                    <p>
                                        Analyze profits, losses, win rate, and trading performance.
                                    </p>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card feature-card shadow-sm">
                                <div className="card-body text-center">
                                    <div className="icon">📈</div>
                                    <h4 className="mt-3">
                                        Performance Reports
                                    </h4>
                                    <p>
                                        Daily, weekly and monthly reports with insightful charts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- CTA --> */}

            {/* <section className="py-5 bg-primary text-white">

                    <div className="container text-center">

                        <h2>
                            Ready to improve your trading?
                        </h2>

                        <p className="mt-3">
                            Start tracking your trades and build consistent trading habits.
                        </p>

                        <button className="btn btn-light btn-lg">
                            <NavLink className="nav-item nav-link" to='/login'>Create Free Account</NavLink>
                        </button>

                    </div>

                </section> */}

            {/* <!-- Footer --> */}

            <footer>

                <div className="container text-center">

                    © 2026 Trade Ledger. All Rights Reserved.

                </div>

            </footer>
        </>
    )
}