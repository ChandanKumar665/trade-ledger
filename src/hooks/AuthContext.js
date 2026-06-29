import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null)
    }
    const login = async (data) => {
        localStorage.setItem('user', data)
        setUser(data);
    }
    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser((userData))
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}