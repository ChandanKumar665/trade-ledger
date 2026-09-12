import useDeviceType from "../../hooks/useDeviceType";
import { formatPnl, formattedCurrency, } from "../utils/utils";
import './calendar.css';

export default function PnlDayCard(props) {
    const { tradesData, day, slectedCalendarDayProps, setSlectedCalendarDayProps, selectedMonth } = props
    const currentDay = `${selectedMonth.value}-${String(props.day).padStart(2, "0")}`;
    const currentTradeDayList = tradesData?.filter(trade => trade.open_time.includes(currentDay));
    const curr = currentTradeDayList[0]?.curr
    const pnl = currentTradeDayList.reduce((acc, curr, index) => acc += curr.pnl, 0);
    const { cls, sign, bg } = formatPnl(pnl)
    const ammount = `${sign}${formattedCurrency(pnl, curr || 'inr')}`;
    const [deviceType, isMobileView] = useDeviceType();
    return (
        <div
            className={`calendar-day ${bg} ${currentDay === slectedCalendarDayProps?.selectedDay ? 'selected' : ''}`}
            key={day}
            data-set={day}
            onClick={(e) => {
                setSlectedCalendarDayProps(prev =>
                ({
                    ...prev, selectedDay: currentDay,
                    currentTradeDayList,
                    pnl,
                    totatPnl: ammount
                }))
            }}
        >
            <div className="date">{day}</div>
            {
                !isMobileView && (
                    <>
                        <div class="amount">
                            {pnl === 0
                                ? "No Trade"
                                : `${ammount}`
                            }
                        </div>
                        <small>
                            {currentTradeDayList.length ? `${currentTradeDayList.length} Trades` : ''}
                        </small> </>
                )
            }
        </div>
    )
}