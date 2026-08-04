import { createContext, useEffect, useState } from "react"
import { getAccountList } from "../services/accounts";
import { getProfile } from "../services/user";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedAccId, setSelectedAccId] = useState()
    const [accountList, setAccountList] = useState([]);
    const [syncAccList, setSyncAccList] = useState(false);
    const [syncUser, setSyncUser] = useState(false);

    const logout = () => {
        setUser(null);
        setSelectedAccId(null);
        setAccountList([]);
    }
    const login = async (token) => {
        setSyncUser(prev => !prev)
        setSyncAccList(prev => !prev);
    }
    const updateSelectedAccount = (id) => {
        setSelectedAccId(id)
    }
    const fetchUsersProfile = async () => {
        const profile = await getProfile()
        setUser(profile.data)
    }
    const fetchAccounts = async () => {
        const accounts = await getAccountList()
        setAccountList(accounts.data)
    }
    useEffect(() => {
        fetchAccounts()
    }, [syncAccList]);

    useEffect(() => {
        fetchUsersProfile()
    }, [syncUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateSelectedAccount,
                selectedAccId,
                accountList,
                setSyncAccList,
                setSyncUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}