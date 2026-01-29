import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import Mainauth from "./auth";

export const Header = () => {
    const { isloggedin, user } = useContext(Mainauth);

    return (
        <header className="app-header">
            <div className="header-inner">
                <div className="brand">Expense<span>Tracker</span></div>
                <nav className="nav-links">
                    {isloggedin && user?.name && (
                        <span className="nav-user">Hi, {user.name}</span>
                    )}
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        to="/home"
                    >
                        <HomeOutlined /> Home
                    </NavLink>
                    {isloggedin && (
                        <NavLink className="nav-link logout-link" to="/logout">
                            <LogoutOutlined /> Logout
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
};
