import { useState } from "react"
import { toast } from 'react-toastify';
import "./filter.css"

export default function Filter(props) {
    const [dates, setDates] = useState();

    const onDateChangeHandler = (key, val) => {
        setDates(prev => ({ ...prev, [key]: val }))
    }
    const clearFilters = () => {
        setDates(prev => ({ start: '', end: '' }));
    }
    const filterData = () => {
        if (!dates) {
            return toast['info']('Select any dates');
        }
        props?.setFilterData(dates);
    }
    return (
        <>
            <div className="filter-card filter-desktop mb-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h6 className="fw-bold mb-1">Filters</h6>
                        {/* <small className="text-muted">
                            Filter your trading records
                        </small> */}
                    </div>
                    {/* <button
                        type="button"
                        className="btn btn-sm btn-link text-decoration-none"
                        onclick={clearFilters}
                    >
                        Clear all
                    </button> */}
                </div>
                <div className="row g-3">
                    <div className="col-lg-4 col-md-4">
                        <label className="filter-label">From Date</label>
                        <input
                            type="date"
                            id="fromDate"
                            className="form-control"
                            name="start"
                            value={dates?.start || props?.filterData?.start || ''}
                            onChange={(e) => onDateChangeHandler('start', e.target.value)}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <label className="filter-label">To Date</label>
                        <input
                            type="date"
                            id="toDate"
                            className="form-control"
                            name="end"
                            value={dates?.end || props?.filterData?.end || ''}
                            onChange={(e) => onDateChangeHandler('end', e.target.value)}
                        />
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2">
                        <button className="btn btn-primary btn-filter" onClick={filterData}>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}