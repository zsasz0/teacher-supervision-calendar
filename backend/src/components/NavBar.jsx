import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        if (window.confirm("Se déconnecter ?")) {
            localStorage.clear();
            navigate("/");
        }
    };

    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            {/* Hamburger Menu */}
                            <div
                                onClick={toggleSidebar}
                                className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-3xl bg-white p-2 hover:bg-slate-100 mr-4 transition-colors duration-300"
                            >
                                <div className="space-y-1.5">
                                    <span className={`block h-1 w-8 origin-center rounded-full bg-slate-500 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-y-2.5 rotate-45' : 'group-hover:translate-y-2.5 group-hover:rotate-45'}`}></span>
                                    <span className={`block h-1 w-6 origin-center rounded-full bg-blue-600 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-0' : 'group-hover:opacity-0'}`}></span>
                                    <span className={`block h-1 w-8 origin-center rounded-full bg-slate-500 transition-transform duration-300 ease-in-out ${isSidebarOpen ? '-translate-y-2.5 -rotate-45' : 'group-hover:-translate-y-2.5 group-hover:-rotate-45'}`}></span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <Link to="/info" className="flex items-center gap-1 border border-slate-200 p-2 rounded-lg shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 bg-white">
                                    <span className="text-xl font-bold text-slate-800">Exam</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="text-xl font-bold text-blue-600">Supervision</span>
                                </Link>
                            </div>
                        </div>
                        <div className="relative inline-flex group">
                            <div className="absolute transition-all duration-1000 opacity-40 -inset-px bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>
                            <button
                                onClick={handleLogout}
                                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:from-blue-700 hover:to-indigo-700 active:scale-95"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-bold text-slate-800">Menu</span>
                        <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Link
                            to="/info"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`group relative px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl flex items-center gap-3 ${isActive("/info") ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isActive("/info") ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Mes Informations
                        </Link>
                        <Link
                            to="/exams"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`group relative px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl flex items-center gap-3 ${isActive("/exams") ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isActive("/exams") ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Choix des Examens
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setIsSidebarOpen(false)}
                            className={`group relative px-4 py-3 text-base font-medium transition-all duration-300 rounded-xl flex items-center gap-3 ${isActive("/contact") ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isActive("/contact") ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Contact & Support
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
