import "./metriccard.css"
import { formattedCurrency } from "./utils";

export default function MetricCard({ label, value, isCurrency = false, curr = 'inr' }) {
    return (
        <div className="analytics-metric h-100">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <p className="analytics-metric-label mb-2">{label}</p>
                    <h3
                        className={`analytics-metric-value mb-1 ${value > 0 && isCurrency
                            ? "text-success"
                            : value < 0 && isCurrency
                                ? "text-danger"
                                : ""
                            }`}
                    >
                        {isCurrency ? formattedCurrency(value, curr) : value}
                    </h3>

                </div>

            </div>
        </div>
    );
}