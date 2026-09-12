import { formatDate2, formatPnl, formattedCurrency } from "../utils/utils"
import './calendar.css'

const TradeListSummaryCard = (props) => {
    const { pnl, symbol, entry_price, exit_price, qty, order_type, curr } = props
    const { cls, sign } = formatPnl(pnl)

    return (
        <div className="dashboard-card">
            <div className="row">

                <strong className="col-md-4 col-sm-4">{symbol.toUpperCase()}</strong>
                <span className="col-md-4 col-sm-4">{order_type?.toUpperCase()}</span>
                <span className={`col-md-4 col-sm-4 ${cls}`}>
                    {`${sign}${formattedCurrency(pnl, curr || 'inr')}`}
                </span>
            </div>
            <hr></hr>
            <div>
                <span className="text-muted">Entry:</span>
                <small className="text-muted fw-bold" >{entry_price}</small>
            </div>
            <div>
                <span className="text-muted">Exit:</span>
                <small className="text-muted fw-bold">{exit_price}</small>
            </div>
            <div>
                <span className="text-muted">Qty:</span>
                <small className="text-muted fw-bold">{qty}</small>
            </div>
        </div>
    )
}

export default function TradeSummary(props) {
    const { slectedCalendarDayProps } = props
    const { cls } = formatPnl(slectedCalendarDayProps?.pnl)
    const selectedDate = slectedCalendarDayProps?.selectedDay && formatDate2(slectedCalendarDayProps?.selectedDay, 'ddd, Do MMMM YYYY').date
    const totalTrades = slectedCalendarDayProps?.currentTradeDayList?.length || 0
    return (
        <div class="dashboard-card h-100">
            <small className="text-muted">
                {selectedDate}
            </small>
            <h3 className={cls}>
                {slectedCalendarDayProps?.totatPnl}
            </h3>
            <hr />
            <div className="">
                <span className="text-muted">Total <strong>{totalTrades}</strong> Trades</span>
            </div>
            <hr />
            <h6>
                Trades
            </h6>
            <div id="tradeList">
                {
                    slectedCalendarDayProps?.currentTradeDayList?.map(trade =>
                        <TradeListSummaryCard key={trade._id} {...trade} />
                    )
                }
            </div>
        </div>
    )
}