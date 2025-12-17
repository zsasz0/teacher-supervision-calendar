import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (
        <div className="min-h-screen text-slate-900 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-gradient-xy"></div>

            {/* Animated Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <NavBar />
                <div className="container mx-auto flex-grow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
