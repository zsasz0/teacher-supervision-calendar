import React from "react";

const Header = ({ handleLogout }) => {
    return (
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Formulaire des Vœux - Surveillance
            </h1>
            <button onClick={handleLogout} className="text-red-600 hover:bg-red-50 border border-red-200 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
            </button>
        </div>
    );
};

export default Header;
