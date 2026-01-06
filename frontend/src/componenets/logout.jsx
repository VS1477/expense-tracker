import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Mainauth from "./auth";
import { message } from "antd";

const Logout = ()=>
{
    const { logout } = useContext(Mainauth);
    
    useEffect(()=>{
        logout();
        message.success("Logout Successfully");
    },[logout]);
    
    return(
        <>
            <Navigate to={"/register"}/>
        </>
    )
}

export default Logout;