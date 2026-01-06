import React from "react";
import {Outlet} from "react-router-dom";
import {Footer} from "./footer";
import {Header} from "./header";
import { Auth } from "./auth";
export const Layout = ()=>
{
    return(
        <>
        <Auth>
        <Header/>
        <div className="content"><Outlet/></div>
        
        <Footer/>
        </Auth>
        </>
    )
}