import React, { useState, useEffect } from "react";
import ExamSessionsTable from "./exam-supervision/ExamSessionsTable";
import SubmitSection from "./exam-supervision/SubmitSection";

const ExamSelectionPage = () => {
    const [id] = useState(localStorage.getItem("userId") || "");
    const [nom] = useState(localStorage.getItem("userNom") || "");
    const [prenom] = useState(localStorage.getItem("userPrenom") || "");
    const [grade] = useState(localStorage.getItem("userGrade") || "");
    const [chargeSurveillance, setChargeSurveillance] = useState("...");
    const [matieres, setMatieres] = useState([]);
    const [teachingSessions, setTeachingSessions] = useState([]);
    const [seanceMetadata, setSeanceMetadata] = useState({});
    const [seancesInfo, setSeancesInfo] = useState([]);
    const [examSessions, setExamSessions] = useState({});
    const [seances, setSeances] = useState({});
    const [seanceInfo, setSeanceInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");
    const [sendingEmail, setSendingEmail] = useState(false);
    const [firstExamDate, setFirstExamDate] = useState(null);
    const [isLocked, setIsLocked] = useState(false);

    const enseignantId = id;
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

    useEffect(() => {
        const fetchData = async () => {
            if (!enseignantId) return;

            try {
                // 1. Grille + vœux existants
                const res = await fetch(`http://localhost:9999/seances-with-voeux/${enseignantId}`);
                if (!res.ok) throw new Error("Séances indisponibles");
                const data = await res.json();
                setExamSessions(data.examSessions || {});

                const prefilled = {};
                const metadata = {};
                Object.entries(data.examSessions || {}).forEach(([day, slots]) => {
                    slots.forEach((options, slotIdx) => {
                        options.forEach((opt) => {
                            if (opt.chosen) prefilled[`${day}-${slotIdx}`] = opt.value;

                            // Store seance metadata if available
                            if (opt.date && opt.horaireStart !== undefined && opt.horaireEnd !== undefined) {
                                metadata[opt.value] = {
                                    date: opt.date,
                                    horaireStart: opt.horaireStart,
                                    horaireEnd: opt.horaireEnd
                                };
                            }

                            // Récupération asynchrone des infos de surveillance
                            fetch(`http://localhost:9999/surveillance/seance/${opt.value}/requis`)
                                .then(r => r.ok ? r.json() : "?")
                                .then(requis => {
                                    fetch(`http://localhost:9999/surveillance/seance/${opt.value}/remaining`)
                                        .then(r => r.ok ? r.json() : { remaining: "?" })
                                        .then(remData => {
                                            const remaining = remData.remaining ?? "?";
                                            setSeanceInfo(prev => ({
                                                ...prev,
                                                [opt.value]: {
                                                    requis,
                                                    assigned: requis !== "?" ? requis - remaining : "?",
                                                    remaining
                                                }
                                            }));
                                        });
                                })
                                .catch(() => {
                                    setSeanceInfo(prev => ({ ...prev, [opt.value]: { requis: "?", remaining: "?" } }));
                                });
                        });
                    });
                });
                setSeances(prefilled);
                setSeanceMetadata(metadata);

                // 2. Charge de surveillance
                const chargeRes = await fetch(`http://localhost:9999/enseignant/${enseignantId}/charge`);
                if (chargeRes.ok) {
                    const c = await chargeRes.json();
                    setChargeSurveillance(c.chargeSurveillance ?? 0);
                }

                // 3. Matières
                const matRes = await fetch(`http://localhost:9999/enseignant/${enseignantId}/matieres`);
                if (matRes.ok) {
                    const mats = await matRes.json();
                    setMatieres(mats);
                }

                // 4. Séances des matières enseignées
                const seancesRes = await fetch(`http://localhost:9999/seances-of-teacher/${enseignantId}`);
                if (seancesRes.ok) {
                    const sData = await seancesRes.json();
                    setTeachingSessions(sData.seances || []);
                }

                // 5. All seances info for lookup
                const allSeancesRes = await fetch('http://localhost:9999/seances_info');
                if (allSeancesRes.ok) {
                    const allSeances = await allSeancesRes.json();
                    setSeancesInfo(allSeances);
                }

                // 6. First exam date to check if locked
                const firstExamRes = await fetch('http://localhost:9999/first-exam-date');
                if (firstExamRes.ok) {
                    const examDateData = await firstExamRes.json();
                    setFirstExamDate(examDateData.firstExamDate);

                    // Check if we're within 24 hours of the first exam
                    const examDate = new Date(examDateData.firstExamDate);
                    const now = new Date();
                    const hoursDiff = (examDate - now) / (1000 * 60 * 60);

                    if (hoursDiff <= 24) {
                        setIsLocked(true);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [enseignantId]);

    const handleChange = (day, slot, value) => {
        if (isLocked) {
            alert("Les modifications ne sont plus possibles 24h avant le premier examen.");
            return;
        }
        const key = `${day}-${slot}`;
        setSeances(prev => ({
            ...prev,
            [key]: value === "" ? undefined : Number(value)
        }));
    };

    const getSelectedCount = () => Object.values(seances).filter(Boolean).length;
    const maxAllowed = Number(chargeSurveillance);
    const isOverLimit = () => !isNaN(maxAllowed) && getSelectedCount() > maxAllowed;

    const handleSubmit = async () => {
        if (isLocked) {
            alert("Les modifications ne sont plus possibles 24h avant le premier examen.");
            return;
        }
        const selectedCount = getSelectedCount();
        if (selectedCount === 0) return alert("Veuillez sélectionner au moins une séance !");
        if (isOverLimit()) return alert(`Vous ne pouvez pas dépasser votre charge maximale : ${maxAllowed} séance(s)`);

        try {
            const res = await fetch("http://localhost:9999/surveillance/voeux/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    enseignantId: Number(enseignantId),
                    seances: Object.values(seances).filter(Boolean).map(Number)
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSuccessMessage(`Succès ! ${data.savedCount} vœu(x) enregistré(s)`);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                alert("Erreur : " + (data.message || "Problème serveur"));
            }
        } catch (err) {
            alert("Serveur injoignable");
        }
    };

    const handleSendEmail = async () => {
        if (!email) return alert("Veuillez saisir un email valide");
        setSendingEmail(true);
        try {
            // Format time helper
            const formatTime = (minutes) => {
                const h = Math.floor(minutes / 60);
                const m = minutes % 60;
                return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
            };

            // Build email body content
            let emailBody = `FSEG - Faculté des Sciences Économiques et de Gestion\n`;
            emailBody += `================================================\n\n`;
            emailBody += `CHOIX DES SÉANCES - Année Universitaire 2024/2025\n\n`;
            emailBody += `Enseignant : ${nom} ${prenom}\n`;
            emailBody += `Grade : ${grade}\n`;
            emailBody += `Charge Max : ${chargeSurveillance}\n\n`;

            if (matieres.length > 0) {
                emailBody += `Matières enseignées :\n`;
                matieres.forEach((m) => {
                    emailBody += `  • ${m.id} - ${m.nom}\n`;
                });
                emailBody += `\n`;
            }

            if (teachingSessions.length > 0) {
                emailBody += `Séances d'examen des matières enseignées :\n`;
                teachingSessions.forEach((s) => {
                    const dateStr = new Date(s.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    emailBody += `  • ${dateStr} : ${formatTime(s.horaireStart)} - ${formatTime(s.horaireEnd)}\n`;
                });
                emailBody += `\n`;
            }

            emailBody += `================================================\n`;
            emailBody += `VŒUX DE SURVEILLANCE\n`;
            emailBody += `================================================\n\n`;

            // Add selected sessions from the exam schedule
            const selectedSeances = Object.entries(seances).filter(([_, value]) => value);
            if (selectedSeances.length > 0) {
                jours.forEach((jour) => {
                    const daySelections = selectedSeances.filter(([key, _]) => key.startsWith(jour));
                    if (daySelections.length > 0) {
                        emailBody += `${jour.toUpperCase()}\n`;
                        daySelections.forEach(([key, seanceId]) => {
                            const slotIdx = parseInt(key.split('-')[1]);
                            let seanceInfo = `  Créneaux ${slotIdx + 1} : Séance #${seanceId}`;

                            // Find seance info from the lookup
                            const details = seancesInfo.find(s => s.id === seanceId);
                            if (details && details.date) {
                                const dateStr = new Date(details.date).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });
                                const timeStart = formatTime(details.horaireStart);
                                const timeEnd = formatTime(details.horaireEnd);
                                seanceInfo += ` - ${dateStr}, ${timeStart} - ${timeEnd}`;
                            }

                            emailBody += `${seanceInfo}\n`;
                        });
                        emailBody += `\n`;
                    }
                });
            } else {
                emailBody += `Aucune séance sélectionnée\n`;
            }

            const res = await fetch("http://localhost:9999/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: email,
                    subject: "Calendrier des Examens - FSEG",
                    body: emailBody
                })
            });

            if (res.ok) {
                alert("Email envoyé avec succès !");
                setEmail("");
            } else {
                alert("Erreur lors de l'envoi de l'email");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'envoi de l'email (Serveur injoignable)");
        } finally {
            setSendingEmail(false);
        }
    };

    if (loading) return <div className="text-center text-white text-3xl mt-40">Chargement...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header for Print Only */}
            <div className="hidden print-header mb-8 text-black">
                <div className="text-center border-b-2 border-black pb-4 mb-6">
                    <h1 className="text-3xl font-bold uppercase tracking-wider">FSEG</h1>
                    <h2 className="text-xl mt-2">Faculté des Sciences Économiques et de Gestion</h2>
                </div>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="text-lg">Enseignant : <span className="font-bold">{nom} {prenom}</span></p>
                        <p className="text-lg">Grade : <span className="font-bold">{grade}</span></p>
                        <p className="text-lg">Charge Max : <span className="font-bold">{chargeSurveillance}</span></p>
                    </div>
                    <div className="text-right">
                        <h3 className="text-2xl font-bold underline">Choix des Séances</h3>
                        <p className="text-sm mt-1">Année Universitaire 2024/2025</p>
                    </div>
                </div>

                {matieres.length > 0 && (
                    <div className="mb-6">
                        <p className="font-bold mb-2">Matières enseignées :</p>
                        <ul className="list-disc list-inside ml-4 mb-4">
                            {matieres.map((m) => (
                                <li key={m.id}>
                                    <span className="font-semibold">{m.id}</span> - {m.nom}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {teachingSessions.length > 0 && (
                    <div className="mb-6">
                        <p className="font-bold mb-2">Séances d'examen des matières enseignées :</p>
                        <ul className="list-disc list-inside ml-4">
                            {teachingSessions.map((s) => {
                                const formatTime = (minutes) => {
                                    const h = Math.floor(minutes / 60);
                                    const m = minutes % 60;
                                    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                                };
                                return (
                                    <li key={s.id}>
                                        <span className="font-semibold">
                                            {new Date(s.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                        {" : "}
                                        {formatTime(s.horaireStart)} - {formatTime(s.horaireEnd)}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>

            <h1 className="text-3xl font-bold mb-10 text-slate-800 border-b border-slate-200 pb-4 no-print">
                Choix des Examens
            </h1>

            {isLocked && (
                <div className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-lg no-print">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <div>
                            <p className="text-red-900 font-bold text-lg">Modifications verrouillées</p>
                            <p className="text-red-700">Les modifications ne sont plus possibles car nous sommes à moins de 24h avant le premier examen ({new Date(firstExamDate).toLocaleDateString('fr-FR')}).</p>
                        </div>
                    </div>
                </div>
            )}

            {successMessage && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center text-lg font-medium text-green-800 no-print">
                    {successMessage}
                </div>
            )}

            <div className="rounded-lg p-6 mb-8 no-print [background:linear-gradient(45deg,theme(colors.blue.50),theme(colors.indigo.50)_50%,theme(colors.blue.50))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.blue.200/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.blue.200/.48))_border-box] border-2 border-transparent animate-border">
                <div className="text-blue-900 font-medium text-lg">
                    Charge max autorisée : <span className="font-bold text-blue-700">{chargeSurveillance}</span>
                </div>
            </div>

            <ExamSessionsTable
                jours={jours}
                examSessions={examSessions}
                seances={seances}
                handleChange={handleChange}
                seanceInfo={seanceInfo}
                isLocked={isLocked}
                teachingSessions={teachingSessions}
            />

            <div className="no-print">
                <SubmitSection
                    isOverLimit={isOverLimit}
                    maxAllowed={maxAllowed}
                    getSelectedCount={getSelectedCount}
                    handleSubmit={handleSubmit}
                />
            </div>

            <div className="mt-8 flex justify-end items-center gap-4 no-print">
                <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-300">
                    <input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3 py-2 outline-none text-sm w-64 rounded-md"
                    />
                    <button
                        onClick={handleSendEmail}
                        disabled={sendingEmail}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition flex items-center gap-2 text-sm disabled:opacity-50"
                    >
                        {sendingEmail ? (
                            "Envoi..."
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Envoyer calendrier
                            </>
                        )}
                    </button>
                </div>

                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.print(); }}
                    className="animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white"
                >
                    <span className="ml-2">Imprimer mes vœux</span>
                </a>
            </div>
        </div>
    );
};

export default ExamSelectionPage;
