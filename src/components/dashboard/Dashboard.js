import Navbar from "../utils/Navbar";
import { useAuth } from "../../hooks/useAuth"
import Chart from 'react-apexcharts'

export default function Dashboard(props) {
    const { user, logout } = useAuth();
    const options = {
        options: {
            chart: {
                id: "basic-line"
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', "Aug"]
            }
        },
        series: [
            {
                name: "series-1",
                data: [22000, 33000, 36000]
            }
        ]
    };
    const donutOptions = {
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        value: {
                            color: 'red'
                        },
                        total: {
                            label: 145
                        },

                    }
                }
            }
        }
    }

    return <>
        <Navbar active_id='dbh' />
        <div className="mt-2">
            <div className="container border border-dark rounded border-1 mb-2">
                <Chart
                    options={options.options}
                    series={options.series}
                    type="line"
                    width="800"
                />
            </div>
            <div className="container border border-dark rounded border-1 mb-2">
                <Chart
                    options={donutOptions}
                    series={[10, 5]}
                    type="donut"
                    width="500"
                />
            </div>

        </div>
    </>
}