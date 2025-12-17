import React from "react";

const UserInfo = ({ grade, id, nom, prenom, chargeSurveillance }) => {
    return (
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full p-8 transition-all duration-300 mb-8 animate-fade-in [background:linear-gradient(45deg,#ffffff,theme(colors.slate.50)_50%,#ffffff)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.200/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.200/.48))_border-box] border-2 border-transparent animate-border">
            <div className="flex flex-col">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-blue-600 mb-2">
                        {prenom} {nom}
                    </h1>
                    <p className="text-gray-600 text-lg">{grade}</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Informations Personnelles
                    </h2>

                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg hover:from-indigo-100 hover:to-blue-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-800" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-gray-600 w-32">Identifiant:</span>
                            <span className="font-semibold text-indigo-900">{id}</span>
                        </li>

                        <li className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-600 w-32">Nom complet:</span>
                            <span className="font-semibold text-blue-900">{nom} {prenom}</span>
                        </li>

                        <li className="flex items-center p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg hover:from-violet-100 hover:to-purple-100 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-violet-800" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-600 w-32">Grade:</span>
                            <span className="font-semibold text-violet-900">{grade}</span>
                        </li>

                        <li className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700 w-32">Charge maximale:</span>
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{chargeSurveillance}</span>
                            <span className="ml-2 text-sm text-gray-600">séances</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
