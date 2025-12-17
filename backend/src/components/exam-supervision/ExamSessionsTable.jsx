import React from "react";

const ExamSessionsTable = ({ jours, examSessions, seances, handleChange, seanceInfo, isLocked, teachingSessions = [] }) => {
    // Helper to check if a slot has a teaching session
    const getTeachingSession = (day, slotIndex) => {
        // Map French day names to English for API comparison
        const dayMapping = {
            "lundi": "MONDAY",
            "mardi": "TUESDAY",
            "mercredi": "WEDNESDAY",
            "jeudi": "THURSDAY",
            "vendredi": "FRIDAY",
            "samedi": "SATURDAY"
        };

        const englishDay = dayMapping[day.toLowerCase()];

        // Define slot times (in minutes from midnight)
        // Slot 0: 8h30 - 10h30 (510 - 630)
        // Slot 1: 11h30 - 13h30 (690 - 810)
        // Slot 2: 14h30 - 16h30 (870 - 990)
        const slotTimes = [
            { start: 510, end: 630 },
            { start: 690, end: 810 },
            { start: 870, end: 990 }
        ];

        const currentSlot = slotTimes[slotIndex];

        return teachingSessions.find(session => {
            if (session.dayOfWeek !== englishDay) return false;

            // Check for overlap
            // Overlap exists if (StartA < EndB) and (EndA > StartB)
            return session.horaireStart < currentSlot.end && session.horaireEnd > currentSlot.start;
        });
    };

    const dayColors = {
        "lundi": "bg-gradient-to-r from-blue-50 to-indigo-50",
        "mardi": "bg-gradient-to-r from-indigo-50 to-violet-50",
        "mercredi": "bg-gradient-to-r from-violet-50 to-purple-50",
        "jeudi": "bg-gradient-to-r from-purple-50 to-pink-50",
        "vendredi": "bg-gradient-to-r from-pink-50 to-rose-50",
        "samedi": "bg-gradient-to-r from-cyan-50 to-blue-50"
    };

    const dayTextColors = {
        "lundi": "text-blue-900",
        "mardi": "text-indigo-900",
        "mercredi": "text-violet-900",
        "jeudi": "text-purple-900",
        "vendredi": "text-pink-900",
        "samedi": "text-cyan-900"
    };

    const dayDotColors = {
        "lundi": "bg-blue-900",
        "mardi": "bg-indigo-900",
        "mercredi": "bg-violet-900",
        "jeudi": "bg-purple-900",
        "vendredi": "bg-pink-900",
        "samedi": "bg-cyan-900"
    };

    return (
        <div className="mt-8 bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 animate-fade-in [background:linear-gradient(45deg,#ffffff,theme(colors.slate.50)_50%,#ffffff)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.200/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.200/.48))_border-box] border-2 border-transparent animate-border">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-blue-600 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Choix des Séances
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-indigo-100">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                            <th className="w-1/4 p-4 text-left font-bold text-base uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Jour
                                </div>
                            </th>
                            <th className="w-1/4 p-4 font-bold text-base uppercase tracking-wider text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    8h30 - 10h30
                                </div>
                            </th>
                            <th className="w-1/4 p-4 font-bold text-base uppercase tracking-wider text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    11h30 - 13h30
                                </div>
                            </th>
                            <th className="w-1/4 p-4 font-bold text-base uppercase tracking-wider text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    14h30 - 16h30
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-100">
                        {jours.map(day => (
                            <tr key={day} className={`${dayColors[day]} hover:shadow-md transition-all duration-300`}>
                                <td className={`p-4 font-bold capitalize text-lg ${dayTextColors[day]}`}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${dayDotColors[day]}`}></div>
                                        {day}
                                    </div>
                                </td>
                                {[0, 1, 2].map(slot => {
                                    const options = examSessions[day]?.[slot] || [];
                                    const key = `${day}-${slot}`;
                                    const teachingSession = getTeachingSession(day, slot);

                                    return (
                                        <td key={key} className="p-4 text-center">
                                            {teachingSession ? (
                                                <div className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 p-3 rounded-lg border-2 border-amber-300 font-bold text-sm shadow-sm">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                        </svg>
                                                        Séance {teachingSession.id}
                                                    </div>
                                                </div>
                                            ) : options.length === 0 ? (
                                                <span className="text-gray-400 italic text-sm bg-gray-50 px-3 py-2 rounded-lg inline-block">Aucune séance</span>
                                            ) : (
                                                <>
                                                    {/* Print View: Simple Text */}
                                                    <span className="hidden print-block font-bold text-slate-900">
                                                        {seances[key] ? `Séance ${seances[key]}` : "-"}
                                                    </span>

                                                    {/* Screen View: Interactive Select */}
                                                    <select
                                                        value={seances[key] || ""}
                                                        onChange={e => handleChange(day, slot, e.target.value)}
                                                        disabled={isLocked}
                                                        className={`w-full p-3 bg-white border-2 ${seances[key] ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50' : 'border-blue-300'} text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 font-medium no-print hover:border-blue-400 shadow-sm ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                    >
                                                        <option value="">Choisir...</option>
                                                        {options.map(opt => {
                                                            const info = seanceInfo[opt.value] || {};
                                                            const isFull = info.remaining === 0;
                                                            const label = info.requis !== undefined
                                                                ? `Séance ${opt.value} (${info.requis} requis)`
                                                                : `Séance ${opt.value}`;

                                                            return (
                                                                <option
                                                                    key={opt.value}
                                                                    value={opt.value}
                                                                    disabled={opt.disabled || isFull}
                                                                    className={isFull ? "text-red-500" : opt.chosen ? "text-green-600 font-medium" : "text-slate-900"}
                                                                >
                                                                    {label}
                                                                    {opt.chosen && " ✓"}
                                                                    {isFull ? " (complet)" : info.remaining !== undefined ? ` - ${info.remaining} place(s)` : ""}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamSessionsTable;

