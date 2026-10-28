
import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { createMany } from "../../services/trade";
import MetricCard from "../utils/MetricCard";
import { toNumber } from "../utils/utils";
import "./analytics.css";
import ChartSummary from "./ChartSummary";


const normalize = (value = "") =>
    String(value).toLowerCase().replace(/[^a-z0-9]/g, "");

const parseAmount = (value) => {
    if (value === null || value === undefined || value === "") return 0;

    let text = String(value).trim();
    const negative = text.startsWith("(") && text.endsWith(")");

    text = text
        .replace(/[₹$€£,\s]/g, "")
        .replace(/[()]/g, "");

    const number = Number(text);
    if (!Number.isFinite(number)) return 0;

    return negative ? -number : number;
};

const findColumn = (headers, candidates) => {
    const normalizedHeaders = headers.map((header) => ({
        original: header,
        normalized: normalize(header),
    }));

    // Prefer exact header matches before partial matches.
    for (const candidate of candidates) {
        const match = normalizedHeaders.find(
            (header) => header.normalized === normalize(candidate)
        );
        if (match) return match.original;
    }

    for (const candidate of candidates) {
        const match = normalizedHeaders.find(
            (header) => header.normalized.includes(normalize(candidate))
        );
        if (match) return match.original;
    }

    return null;
};

const formatMoney = (value) =>
    new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

export default function Analytics() {
    const { selectedAccId, selectedAccount } = useAuth();
    const [rawData, setRawData] = useState([]);
    const [records, setRecords] = useState([]);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
        scales: {
            x: {
                ticks: {
                    // autoSkip: true,
                    maxTicksLimit: Math.min(records.length, 30),
                    maxRotation: 0,
                },
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
            },
        }
    }
    const headers = useMemo(
        () => (records.length ? Object.keys(records[0]) : []),
        [records]
    );

    const columns = useMemo(() => {
        if (!headers.length) return {};

        return {
            pnl: findColumn(headers, [
                "Realized PNL in INR",
            ]),
            funding: findColumn(headers, [
                "Funding Fee"
            ]),
            fee: findColumn(headers, [
                "Fees in INR",
            ]),
            net_pnl: findColumn(headers, [
                "Net PNL in INR",
            ]),
            date: findColumn(headers, [
                "Date and Time",
            ]),
        };
    }, [headers]);

    const totals = useMemo(() => {
        return records.reduce(
            (sum, row) => ({
                pnl: sum.pnl + parseAmount(columns.pnl ? row[columns.pnl] : 0),
                funding:
                    sum.funding +
                    parseAmount(columns.funding ? row[columns.funding] : 0),
                fee: (sum.fee + parseAmount(columns.fee ? -row[columns.fee] : 0)),
                net_pnl: sum.pnl + sum.funding + sum.fee
            }),
            { pnl: 0, funding: 0, fee: 0, net_pnl: 0 }
        );
    }, [records, columns]);



    const handleUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setError("");

        Papa.parse(file, {
            header: true,
            skipEmptyLines: "greedy",
            transformHeader: (header) => header.trim(),
            complete: (result) => {
                const ogData = result.data.filter((row, index) => {
                    if (index === 0) return
                    return Object.values(row).some(
                        (value) => value !== null && String(value).trim() !== ""
                    )
                }).map(items => ({
                    ...items,
                    "Fees in INR": toNumber(items['Fees in INR']),
                    "Net PNL in INR": toNumber(items['Net PNL in INR']),
                    "Order Value in INR": toNumber(items['Order Value in INR']),
                    "Realized PNL in INR": toNumber(items['Realized PNL in INR'])
                }));
                const cleanedRecords = ogData.map((({
                    ["Transaction ID"]: _,
                    ["Order Value in INR"]: __,
                    ["Leverage Taken"]: ___,
                    ...rest }) => ({ ...rest, "Funding Fee": rest['Transaction Type'] === 'FUNDING' ? rest['Net PNL in INR'] : 0 })))

                if (!cleanedRecords.length) {
                    setRecords([]);
                    setFileName("");
                    setError("No records found. Please upload a valid CSV file.");
                    return;
                }
                setRawData(ogData);
                setRecords(cleanedRecords);
                setFileName(file.name);

                if (result.errors.length) {
                    setError(
                        `${result.errors.length} CSV parsing warning(s). Please verify the imported records.`
                    );
                }
            },
            error: () => setError("Unable to read this CSV file."),
        });

        // Allows selecting the same file again.
        event.target.value = "";
    };

    const groupAnalyticsByDate = () => {
        const grouped = {};
        records.map((row, index) => {
            const dates = row["Date and Time"]?.split(" ")[0];
            const txnType = row["Transaction Type"]?.trim().toUpperCase();

            if (!grouped[dates]) {
                grouped[dates] = {
                    dates,
                    realizedPnl: 0,
                    tradingFees: 0,
                    fundingFees: 0,
                    netPnl: 0
                };
            }

            const realized = ((row["Realized PNL in INR"])) || 0;
            const fees = ((row["Fees in INR"])) || 0;
            const funding = (row["Funding Fee"]) || 0;
            const net = (row["Net PNL in INR"]) || 0;

            if (txnType === "BUY" || txnType === "SELL") {
                grouped[dates].realizedPnl += realized;
                grouped[dates].tradingFees += fees;
                grouped[dates].netPnl += net;
            } else if (txnType === "FUNDING") {
                grouped[dates].fundingFees += funding;
            }
        });
        return grouped;
    }

    const getChartData = (key) => {
        const groupedData = groupAnalyticsByDate();
        const labels = Object.keys(groupedData);

        return {
            labels,
            datasets: [
                {
                    label: key,
                    data: labels.map((row, index) => parseAmount(groupedData[row][key])),
                    fill: true,
                },
            ],
        };
    };

    const transformedChartData = (dataset) => ({
        ...dataset,
        backgroundColor: dataset.data.map((value) => {
            if (value >= 0 && dataset.label === 'tradingFees') {
                return "#e8b149"
            } else if (value >= 0) {
                return "#16A34A"
            } else {
                return "#f24e53"
            }
        }
        ),

    })

    const saveTradesData = async () => {
        console.log('og', rawData)

        const payload = rawData.map(item => ({
            "txnid": item['Transaction ID'],
            "symbol": item['Asset Symbol'],
            "order_type": item['Transaction Type'],
            "desc": "crypto csv upload",
            "open_time": item['Date and Time'],
            "close_time": "0",
            "entry_price": '0',
            "exit_price": '0',
            "qty": item['Quantity'] || 1,
            "pnl": item['Realized PNL in INR'],
            "charges": 0,
            "fees": {
                tradingFees: item['Fees in INR']
            },
            "account_id": selectedAccId
        }))

        const res = await createMany({ data: payload });
        console.log(res);
        toast[res.type](res.message);
    }

    useEffect(() => {
        groupAnalyticsByDate()
    }, [records])

    const hasPnl = Boolean(columns.pnl);
    const hasFunding = Boolean(columns.funding);
    const hasFee = Boolean(columns.fee);
    console.log('re', records)
    return (
        <>
            <div class="section-header justify-content-between align-items-center mb-3">
                <h4 class="mb-1 fw-bold">Analytics</h4>
                <small class="text-muted">
                    Overview of your trading performance
                </small>
            </div>
            <div className="">
                <div className="analytics-metric d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                    <label className="btn btn-primary analytics-upload">
                        <span className="me-2">↑</span> Upload CSV
                        <input
                            type="file"
                            accept=".csv,text/csv"
                            onChange={handleUpload}
                            hidden
                        />
                    </label>
                    {fileName && (
                        <div className="analytics-file">
                            <span>📄</span>
                            <span className="text-truncate">{fileName}</span>
                            <span className="ms-auto text-secondary">
                                {records.length} records
                            </span>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                )}

                {records.length === 0 ? (
                    <div className="analytics-empty text-center p-5">
                        <div className="analytics-empty-icon mb-3">⇧</div>
                        <h5>Upload your trading history</h5>
                        <p className="text-secondary mb-3">
                            Select a CSV export from your exchange to view your analytics.
                        </p>
                        <label className="btn btn-outline-primary">
                            Choose CSV file
                            <input
                                type="file"
                                accept=".csv,text/csv"
                                onChange={handleUpload}
                                hidden
                            />
                        </label>
                    </div>
                ) : (
                    <>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-4">
                                <MetricCard
                                    label="Gross P&L"
                                    value={totals.pnl}
                                    isCurrency={true}
                                    curr={selectedAccount.curr}
                                    found={hasPnl}
                                    icon=""
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <MetricCard
                                    label="Funding Fees"
                                    value={totals.funding}
                                    isCurrency={true}
                                    found={hasFunding}
                                    icon=""
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <MetricCard
                                    label="Fees Paid"
                                    value={totals.fee}
                                    isCurrency={true}
                                    found={hasFee}
                                    icon=""
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <MetricCard
                                    label="Net P&L"
                                    value={totals.net_pnl}
                                    isCurrency={true}
                                    found={hasPnl}
                                    icon=""
                                />
                            </div>
                        </div>

                        {(!hasPnl || !hasFunding || !hasFee) && (
                            <div className="alert alert-info">
                                Could not identify every metric column automatically.
                                {!hasPnl && " P&L column not detected."}
                                {!hasFunding && " Funding fee column not detected."}
                                {!hasFee && " Fee paid column not detected."}
                                Check your CSV header names or customize the column candidates
                                in the code.
                            </div>
                        )}

                        {hasPnl && (
                            <>
                                <ChartSummary
                                    title='Realized P&L'
                                    data={{
                                        ...getChartData('realizedPnl'),
                                        datasets: getChartData('realizedPnl').datasets.map(transformedChartData)
                                    }}
                                    options={chartOptions}
                                />
                                <ChartSummary
                                    title='Funding Fees'
                                    data={{
                                        ...getChartData('fundingFees'),
                                        datasets: getChartData('fundingFees').datasets.map(transformedChartData)
                                    }}
                                    options={chartOptions}
                                />
                                <ChartSummary
                                    title='Trading Fees'
                                    data={{
                                        ...getChartData('tradingFees'),
                                        datasets: getChartData('tradingFees').datasets.map(transformedChartData)
                                    }}
                                    options={chartOptions}
                                />
                            </>
                        )}

                        <div className="analytics-panel mb-3">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                                <div>
                                    <h5 className="mb-1">Transaction Records</h5>
                                    <p className="text-secondary small mb-0">
                                        Scroll horizontally to see all columns.
                                    </p>
                                </div>
                                <span className="text-secondary small">
                                    {records.length} rows
                                </span>
                            </div>

                            <div className="analytics-table-wrap">
                                <table className="table table-hover align-middle analytics-table mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {headers.map((header) => (
                                                <th key={header} title={header}>
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map((row, index) => (
                                            <tr key={index}>
                                                <td className="text-secondary">{index + 1}</td>
                                                {headers.map((header) => {
                                                    const isPnl = header === columns.pnl;
                                                    const amount = parseAmount(row[header]);
                                                    const looksNumeric =
                                                        row[header] !== "" &&
                                                        row[header] !== null &&
                                                        row[header] !== undefined &&
                                                        Number.isFinite(
                                                            Number(
                                                                String(row[header])
                                                                    .replace(/[₹$€£,\s]/g, "")
                                                                    .replace(/[()]/g, "")
                                                            )
                                                        );

                                                    return (
                                                        <td
                                                            key={header}
                                                            className={
                                                                isPnl
                                                                    ? amount > 0
                                                                        ? "text-success fw-semibold"
                                                                        : amount < 0
                                                                            ? "text-danger fw-semibold"
                                                                            : ""
                                                                    : ""
                                                            }
                                                        >
                                                            {row[header] === null ||
                                                                row[header] === undefined
                                                                ? "—"
                                                                : looksNumeric
                                                                    ? row[header]
                                                                    : String(row[header]) || "—"}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="justify-content-center text-align-centre">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={saveTradesData}
                            >
                                <span>
                                    <i className="bi bi-save"></i>&nbsp;
                                    Save Data
                                </span>
                            </button>
                        </div>

                    </>
                )}
            </div>
            <ToastContainer autoClose={1000} />
        </>
    );
}
