import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null)
    }
    const login = async (data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}