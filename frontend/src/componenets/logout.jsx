import React, { useContext, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import Mainauth from "./auth";
import { message } from "antd";

const Logout = () => {
    const { logout } = useContext(Mainauth);
    const messageShown = useRef(false);

    useEffect(() => {
        logout();
        if (!messageShown.current) {
            messageShown.current = true;
            message.success("Logout Successfully");
        }
    }, [logout]);

    return <Navigate to="/register" />;
}

export default Logout;