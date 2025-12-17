import React from "react";

const SubjectsTable = ({ matieres }) => {
    const colors = [
        'from-indigo-100 to-indigo-200 text-indigo-800 hover:from-indigo-200 hover:to-indigo-300',
        'from-blue-100 to-blue-200 text-blue-800 hover:from-blue-200 hover:to-blue-300',
        'from-violet-100 to-violet-200 text-violet-800 hover:from-violet-200 hover:to-violet-300',
        'from-purple-100 to-purple-200 text-purple-800 hover:from-purple-200 hover:to-purple-300',
        'from-cyan-100 to-cyan-200 text-cyan-800 hover:from-cyan-200 hover:to-cyan-300',
    ];

    return (
        <div className="mt-8 bg-white rounded-xl shadow-2xl max-w-5xl w-full p-8 transition-all duration-300 animate-fade-in [background:linear-gradient(45deg,#ffffff,theme(colors.slate.50)_50%,#ffffff)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.200/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.200/.48))_border-box] border-2 border-transparent animate-border">
            <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Matières Enseignées
            </h2>
            {matieres.length === 0 ? (
                <p className="text-center text-gray-500 italic py-8 bg-gray-50 rounded-lg">Aucune matière trouvée</p>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {matieres.map((m, index) => (
                        <div
                            key={m.id}
                            className={`group bg-gradient-to-r ${colors[index % colors.length]} px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer flex items-center gap-2`}
                        >
                            <span className="font-mono text-xs opacity-75">{m.id}</span>
                            <span className="font-semibold">{m.nom}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubjectsTable;
