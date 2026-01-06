import React, { useState, useEffect } from "react";
import { createContext } from "react";


const Mainauth = createContext();
export const Auth = ({children})=>
{
    const [token,setToken] = useState(localStorage.getItem("token"));
    const isloggedin = !!token;

    // Listen for storage events (when localStorage changes in other tabs/windows)
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Function to update token (called after login)
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    // Function to remove token (called after logout)
    const logout = () => {
        localStorage.removeItem("token");

        setToken(null);
    };

    return(
        <>
        <Mainauth.Provider value={{isloggedin, login, logout, token}}>{children}</Mainauth.Provider>
        </>
    )

}
export default Mainauth;