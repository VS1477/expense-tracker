import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import { Auth } from "./auth";

export const Layout = () => {
    return (
        <Auth>
            <div className="app-layout">
                <Header />
                <main className="content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </Auth>
    );
};