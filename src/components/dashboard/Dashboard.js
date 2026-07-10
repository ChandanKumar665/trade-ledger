import Navbar from "../utils/Navbar";
import { useAuth } from "../../hooks/useAuth"
import { useNavigate, Navigate } from "react-router-dom";
import Chart from 'react-apexcharts'

export default function Dashboard(props) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
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
    const handleLogout = () => {
        logout();
        navigate('/')
    }

    return <>
        <Navbar active_id='dbh' />
        <div>
            This is Dashboard
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
            <button className="btn btn-primary" onClick={handleLogout}>
                Logout
            </button>
        </div>
    </>
}