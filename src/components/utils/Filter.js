import { useState } from "react"
import { toast } from 'react-toastify';

export default function Filter(props) {
    const [dates, setDates] = useState();

    const onDateChangeHandler = (key, val) => {
        setDates(prev => ({ ...prev, [key]: val }))
    }
    const filterData = () => {
        if (!dates) {
            return toast['info']('Select any dates');
        }
        props?.setFilterData(dates);
    }
    return (
        <div className="border border-dark rounded border-1 mb-2 p-2 d-flex justify-content-end">
            <div className="bd-highlight p-2">
                <label >From</label>
                <input
                    className="form-control"
                    type="date"
                    name="start"
                    value={dates?.start || props?.filterData?.start || ''}
                    onChange={(e) => onDateChangeHandler('start', e.target.value)}
                />
            </div>
            <div className="bd-highlight p-2">
                <label >To</label>
                <input
                    className="form-control"
                    type="date"
                    name="end"
                    value={dates?.end || props?.filterData?.end || ''}
                    onChange={(e) => onDateChangeHandler('end', e.target.value)}
                />
            </div>
            <div className="bd-highlight p-2" style={{ marginTop: '20px' }}>
                <label className="" hidden></label>
                <button className=" btn btn-primary" onClick={filterData}>Apply</button>
            </div>
        </div>
    )
}