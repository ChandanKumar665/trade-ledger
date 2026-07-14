import Navbar from "../utils/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { Chart } from "react-google-charts";

export default function Dashboard(props) {
    const { user, logout } = useAuth();
    const data = [
        ["Jun", "Sales"],
        ["July", 1000,],
        ["Aug", 1170,],
        ["Sep", 660,],
        ["Oct", 1030,],
    ];

    const options = {
        chart: {
            title: "Trading Performance",
            subtitle: "PnL",
        },
    };

    return <>
        <Navbar active_id='dbh' />
        <div className="mt-2">
            <div className="container border border-dark rounded border-1 mb-2">
                <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>
            <div className="container border border-dark rounded border-1 mb-2">

            </div>

        </div>
    </>
}