import Login from "../login";
import Navbar from "../utils/Navbar";

export default function Home() {
    return <>
        <Navbar hm_active={true} />
        <div>
            <Login />
        </div>
    </>
}