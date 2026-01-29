import React, { useState, useEffect } from "react";
import { createContext } from "react";


const Mainauth = createContext();
export const Auth = ({children})=>
{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    });
    const isloggedin = !!token;

    // Listen for storage events (when localStorage changes in other tabs/windows)
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
            try {
                setUser(JSON.parse(localStorage.getItem("user")));
            } catch {
                setUser(null);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Function to update token and user (called after login)
    const login = (newToken, userData) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        }
    };

    // Function to remove token and user (called after logout)
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return(
        <>
        <Mainauth.Provider value={{ isloggedin, login, logout, token, user }}>{children}</Mainauth.Provider>
        </>
    )

}
export default Mainauth;