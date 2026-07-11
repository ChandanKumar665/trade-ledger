import { useEffect, useState } from "react";
import { getAccountList } from "../services/accounts";
import { useAuth } from "./useAuth";

export default function useAccount() {
    const { user } = useAuth();
    const [accountList, setAccountList] = useState([]);

    const get = async () => {
        const res = await getAccountList({ user_id: user._id });
        if (res?.statusCode === 200) {
            setAccountList(res.data)
        }
        // return toast[res.type](res.message);
    }
    useEffect(() => {
        get()
    }, []);

    return { accountList }
}