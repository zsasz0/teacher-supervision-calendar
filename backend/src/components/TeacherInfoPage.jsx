import React, { useState, useEffect } from "react";
import UserInfo from "./exam-supervision/UserInfo";
import SubjectsTable from "./exam-supervision/SubjectsTable";

const TeacherInfoPage = () => {
    const [grade] = useState(localStorage.getItem("userGrade") || "Non défini");
    const [id] = useState(localStorage.getItem("userId") || "");
    const [nom] = useState(localStorage.getItem("userNom") || "");
    const [prenom] = useState(localStorage.getItem("userPrenom") || "");
    const [chargeSurveillance, setChargeSurveillance] = useState("...");
    const [matieres, setMatieres] = useState([]);
    const [loading, setLoading] = useState(true);

    const enseignantId = id;

    useEffect(() => {
        const fetchData = async () => {
            if (!enseignantId) return;

            try {
                const [matRes, chargeRes] = await Promise.all([
                    fetch(`http://localhost:9999/enseignant/${enseignantId}/matieres`),
                    fetch(`http://localhost:9999/enseignant/${enseignantId}/charge`)
                ]);

                if (matRes.ok) {
                    const mats = await matRes.json();
                    setMatieres(mats);
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

    if (loading) return <div className="text-center text-white text-3xl mt-40">Chargement...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-10 text-slate-800 border-b border-slate-200 pb-4">
                Mes Informations
            </h1>

            <UserInfo
                grade={grade}
                id={id}
                nom={nom}
                prenom={prenom}
                chargeSurveillance={chargeSurveillance}
            />

            <SubjectsTable matieres={matieres} />


        </div>
    );
};

export default TeacherInfoPage;
