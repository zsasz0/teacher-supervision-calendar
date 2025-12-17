import React from "react";

const SubmitSection = ({ isOverLimit, maxAllowed, getSelectedCount, handleSubmit }) => {
    return (
        <div className="mt-12 text-center">
            {isOverLimit() && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-lg font-medium text-red-700">
                    Dépassement ! Max autorisé : <strong>{maxAllowed}</strong> (vous avez {getSelectedCount()})
                </div>
            )}
            <button
                onClick={handleSubmit}
                disabled={getSelectedCount() === 0 || isOverLimit()}
                className={`text-lg font-bold px-10 py-4 rounded-xl shadow-md transition-all duration-200
          ${getSelectedCount() > 0 && !isOverLimit()
                        ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
            >
                {isOverLimit()
                    ? `Dépassement (max ${maxAllowed})`
                    : `Valider mes vœux (${getSelectedCount()} sélectionnée${getSelectedCount() > 1 ? "s" : ""})`
                }
            </button>
        </div>
    );
};

export default SubmitSection;
