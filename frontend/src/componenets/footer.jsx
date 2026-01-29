import React from "react";

export const Footer = () => {
    return (
        <footer className="app-footer">
            <p className="text-cenetr">© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        </footer>
    );
};