import { createContext, useEffect, useState } from "react"
import { getAccountList } from "../services/accounts";
import { getProfile } from "../services/user";
import { getLoggedInUser } from "../services/auth";

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
        setUser(true);
        setSyncUser(prev => !prev)
        setSyncAccList(prev => !prev);
    }
    const updateSelectedAccount = (id) => {
        setSelectedAccId(id)
    }
    const fetchUsersProfile = async () => {
        try {
            const profile = await getProfile()
            setUser(profile.data)
        } catch (error) {

        }

    }
    const fetchAccounts = async () => {
        try {
            const accounts = await getAccountList();
            setAccountList(accounts.data || []);
            setSelectedAccId(accounts.data[0]._id);
        } catch (error) {

        }

    }
    useEffect(() => {
        if (user) {
            fetchAccounts()
        }
    }, [syncAccList, user]);

    useEffect(() => {
        if (user) {
            fetchUsersProfile()
        }
    }, [syncUser]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getLoggedInUser()
                setUser(res.data);
            } catch {
                setUser(null);
            }
        };
        checkAuth();
    }, [])

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