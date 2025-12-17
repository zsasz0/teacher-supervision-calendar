import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./exam-supervision/Header";
import UserInfo from "./exam-supervision/UserInfo";
import SubjectsTable from "./exam-supervision/SubjectsTable";
import ExamSessionsTable from "./exam-supervision/ExamSessionsTable";
import SubmitSection from "./exam-supervision/SubmitSection";

const ExamSupervisionForm = () => {
  const [grade] = useState(localStorage.getItem("userGrade") || "Non défini");
  const [id] = useState(localStorage.getItem("userId") || "");
  const [nom] = useState(localStorage.getItem("userNom") || "");
  const [prenom] = useState(localStorage.getItem("userPrenom") || "");
  const [chargeSurveillance, setChargeSurveillance] = useState("...");
  const [examSessions, setExamSessions] = useState({});
  const [seances, setSeances] = useState({});
  const [matieres, setMatieres] = useState([]); // ← tableau d'objets { id, nom }
  const [seanceInfo, setSeanceInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const enseignantId = id;
  const navigate = useNavigate();

  // === CHARGEMENT DES DONNÉES ===
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
        Object.entries(data.examSessions || {}).forEach(([day, slots]) => {
          slots.forEach((options, slotIdx) => {
            options.forEach((opt) => {
              if (opt.chosen) prefilled[`${day}-${slotIdx}`] = opt.value;

              // Récupération asynchrone des infos de surveillance (requis / restant)
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

        // 2. Matières + Charge de surveillance
        const [matRes, chargeRes] = await Promise.all([
          fetch(`http://localhost:9999/enseignant/${enseignantId}/matieres`),
          fetch(`http://localhost:9999/enseignant/${enseignantId}/charge`)
        ]);

        if (matRes.ok) {
          const mats = await matRes.json();
          setMatieres(mats); // ← [{id:1,nom:"Mathématiques"}, ...]
        }
        if (chargeRes.ok) {
          const c = await chargeRes.json();
          setChargeSurveillance(c.chargeSurveillance ?? 0);
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

  const handleLogout = () => {
    if (window.confirm("Se déconnecter ?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  if (loading) return <div className="text-center text-slate-600 text-3xl mt-40">Chargement...</div>;

  const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Header handleLogout={handleLogout} />

        {successMessage && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center text-lg font-medium text-green-800">
            {successMessage}
          </div>
        )}

        <UserInfo
          grade={grade}
          id={id}
          nom={nom}
          prenom={prenom}
          chargeSurveillance={chargeSurveillance}
        />

        <SubjectsTable matieres={matieres} />

        <ExamSessionsTable
          jours={jours}
          examSessions={examSessions}
          seances={seances}
          handleChange={handleChange}
          seanceInfo={seanceInfo}
        />

        <SubmitSection
          isOverLimit={isOverLimit}
          maxAllowed={maxAllowed}
          getSelectedCount={getSelectedCount}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ExamSupervisionForm;