
import "./analytics.css";
import { Bar } from "react-chartjs-2";


export default function ChartSummary({ title, data, options }) {
    return (
        <div className="analytics-panel mb-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                <div>
                    <h5 className="mb-1">{title}</h5>
                    <p className="text-secondary small mb-0">
                        Values follow the order in your CSV.
                    </p>
                </div>
                <span className="badge text-bg-light">
                    110 records
                </span>
            </div>

            <div className="analytics-chart-scroll">
                <div
                    className="analytics-chart-inner"
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}