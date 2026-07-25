import Navbar from "../utils/Navbar";
import SideNav from "../utils/SideNav";

export default function Reports() {
    return (<>
        <Navbar />
        <div className="row p-2">
            <div className="col-lg-2 p-2">
                <SideNav active_id='rep' />
            </div>
            <main className="col-lg-10 p-2">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>Reports</h2>
                </div>
            </main>
        </div>
    </>)
}