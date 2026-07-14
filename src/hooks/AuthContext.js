import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });
    const [selectedAccId, setSelectedAccId] = useState()

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setSelectedAccId(null);
    }
    const login = async (data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data);
    }
    const updateSelectedAccount = (id) => {
        setSelectedAccId(id)
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, updateSelectedAccount, selectedAccId }}>
            {children}
        </AuthContext.Provider>
    )
}