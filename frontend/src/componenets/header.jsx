import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Mainauth from "./auth";
export const Header = () => {

    const {isloggedin} = useContext(Mainauth);
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <h4>ExpanseTracker</h4>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">
                                Home
                            </NavLink>

                            {
                                isloggedin && (
                                    <NavLink className="nav-link" to="/logout">
                                        Logout
                                    </NavLink>
                                )
                            }
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};
