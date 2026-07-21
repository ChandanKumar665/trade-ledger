import { createContext, useEffect, useState } from "react"
import { getAccountList } from "../services/accounts";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });
    const [selectedAccId, setSelectedAccId] = useState()
    const [accountList, setAccountList] = useState([]);
    const [syncAccList, setSyncAccList] = useState(false)

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setSelectedAccId(null);
        setAccountList([]);
    }
    const login = async (data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data);
        setSyncAccList(!syncAccList);
    }
    const updateSelectedAccount = (id) => {
        setSelectedAccId(id)
    }
    const get = async () => {
        const res = await getAccountList({ user_id: user._id });
        if (res?.statusCode === 200) {
            setAccountList(res.data)
        }
    }
    useEffect(() => {
        if (user) {
            get()
        }
    }, [syncAccList], user);


    return (
        <AuthContext.Provider value={{ user, login, logout, updateSelectedAccount, selectedAccId, accountList, syncAccList, setSyncAccList }}>
            {children}
        </AuthContext.Provider>
    )
}