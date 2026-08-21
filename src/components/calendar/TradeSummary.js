import { formatDate2, formatPnl, formattedCurrency } from "../utils/utils"
import './style.css'
const TradeListSummaryCard = (props) => {
    const { pnl, symbol, entry_price, exit_price, qty, order_type, curr } = props
    const { cls, sign } = formatPnl(pnl)

    return (
        <div class="trade-item">
            <div class="d-flex justify-content-between">
                <strong>{symbol.toUpperCase()}</strong>
                <span>{order_type?.toUpperCase()}</span>
                <span class={cls}>
                    {`${sign}${formattedCurrency(pnl, curr || 'inr')}`}
                </span>
            </div>
            <div class="text-muted">
                Entry {entry_price}
                •
                Exit {exit_price}
            </div>
            <div class="text-muted">
                Qty {qty}
            </div>
        </div>
    )
}

export default function TradeSummary(props) {
    const { slectedCalendarDayProps } = props
    const { cls } = formatPnl(slectedCalendarDayProps?.pnl)
    return (
        <div class="card custom-card h-100">
            <h5>
                {slectedCalendarDayProps?.selectedDay && formatDate2(slectedCalendarDayProps?.selectedDay, 'ddd, Do MMMM YYYY').date}
            </h5>
            <h2 className={cls}>
                {slectedCalendarDayProps?.totatPnl}
            </h2>
            <hr />
            <div className="stats">
                <div>
                    <span className="text-muted">{slectedCalendarDayProps?.currentTradeDayList?.length || 0} Trades</span>
                </div>
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