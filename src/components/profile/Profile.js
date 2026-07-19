import Navbar from "../utils/Navbar";
import "./profile.css"

export default function Profile() {
    return (
        <>
            <Navbar />
            <div class="profile-banner"></div>
            <div className="container">
                {/* <!-- Profile Card --> */}
                <div className="card shadow profile-card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-lg-2 text-center">
                                <img src="https://ui-avatars.com/api/?name=Elon+Musk" className="profile-img" />
                            </div>
                            <div className="col-lg-7">
                                <h2 className="fw-bold mb-1">
                                    Chandan Kumar
                                </h2>
                                <p className="text-muted mb-2">
                                    Software Engineer • Trader
                                </p>
                                <span className="badge-soft me-2">
                                    <i className="bi bi-envelope me-1"></i>
                                    chandan@example.com
                                </span>
                                <span className="badge-soft">
                                    <i className="bi bi-telephone me-1"></i>
                                    +91 9876543210
                                </span>
                            </div>
                            <div className="col-lg-3 text-lg-end mt-4 mt-lg-0">
                                <button className="btn btn-primary px-4">
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}