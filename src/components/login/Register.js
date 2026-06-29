export default function Register() {
    return (
        <>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="number"
                    className="form-control"
                    value={data.mobile || ''}
                    disabled={isOtpSent}
                    onChange={(e) => changeHandler('mobile', e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Trading Experience</label>
                <input
                    type="number"
                    className="form-control"
                    value={data.mobile || ''}
                    disabled={isOtpSent}
                    onChange={(e) => changeHandler('mobile', e.target.value)} />
            </div></>
    )
}