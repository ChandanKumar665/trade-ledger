import { useAuth } from "../../hooks/useAuth";
import Navbar from "../utils/Navbar";
import "./profile.css"

export default function Profile() {
    const { user } = useAuth();
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-2 text-center">
                            <img src={`https://ui-avatars.com/api/?name=${user?.name}`} className="profile-img" />
                        </div>
                        <div className="col-lg-7">
                            <h2 className="fw-bold mb-2">
                                {userDetails.name}
                            </h2>
                            <p className="text-muted mb-2">
                                Trading Experience - {userDetails.trading_exp}
                            </p>
                            <span className="badge-soft me-2">
                                <i className="bi bi-envelope me-1"></i>
                                {userDetails.email}
                            </span>
                            <span className="badge-soft">
                                <i className="bi bi-telephone me-1"></i>
                                +91 {user.phone}
                            </span>
                        </div>
                        <div className="col-lg-3 text-lg-end mt-4 mt-lg-0">
                            <button className="btn btn-primary px-4"
                                disabled={edit}
                                onClick={(e) => setEdit(prev => !prev)}
                            >
                                <i className="bi bi-pencil-square me-2"></i>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="info-box mt-4 text-start">
                        <h6 className="fw-bold mb-3">
                            Account Information
                        </h6>
                        <p className="mb-2">
                            <i className="bi bi-calendar-event text-primary me-2"></i>
                            Member Since: <strong>{formatDate(user.createdAt).date}</strong>
                        </p>
                        <p className="mb-2">
                            <i className="bi bi-envelope-check text-success me-2"></i>
                            Email Verified
                        </p>
                        <p className="mb-0">
                            <i className="bi bi-shield-check text-primary me-2"></i>
                            Account Secure
                        </p>
                    </div>
                    <hr />
                    <h3 className="mb-4">
                        Edit Profile
                    </h3>
                    <form onSubmit={formSubmitHandler}>
                        <div className="section-title">
                            Personal Information
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={data.name || userDetails.name}
                                    disabled={!edit}
                                    onChange={(e) => onChangeHandler('name', e.target.value)}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    disabled={!edit}
                                    value={data.email || userDetails.email}
                                    onChange={(e) => onChangeHandler('email', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Mobile
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={user.phone}
                                    disabled
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Trading Experience
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    disabled={!edit}
                                    value={data.trading_exp || userDetails.trading_exp}
                                    onChange={(e) => onChangeHandler('trading_exp', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Bio
                            </label>
                            <textarea
                                className="form-control"
                                rows="4"
                                value={data.bio || userDetails.bio}
                                disabled={!edit}
                                placeholder="Tell us something about yourself..."
                                onChange={(e) => onChangeHandler('bio', e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-end mt-4">
                            <button
                                type="reset"
                                class="btn btn-light me-2 reset"
                                disabled={!edit}
                                onClick={(e) => setEdit(prev => !prev)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary px-4"
                                disabled={!edit}
                            >
                                <i className="bi bi-check-circle me-2"></i>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </>

    )
}