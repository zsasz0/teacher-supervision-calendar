import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:9999/user/${id}/auth`, { pwd: password });

      if (res.status === 200 && res.data.enseignant) {
        const { enseignant } = res.data;
        const grade = enseignant.grade?.grade || "N/A";
        const nom = enseignant.nom || "";
        const prenom = enseignant.prenom || "";

        localStorage.setItem("authToken", "authenticated");
        localStorage.setItem("userGrade", grade);
        localStorage.setItem("userNom", nom);
        localStorage.setItem("userPrenom", prenom);
        localStorage.setItem("userId", id);

        navigate("/info");
      } else {
        setError("Authentification échouée. Vérifiez vos identifiants.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-gradient-xy"></div>

      {/* Animated Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-8 transform transition-all hover:scale-[1.01] duration-300 z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="relative w-[max-content] font-mono text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-blue-800 before:absolute before:inset-0 before:animate-typewriter before:bg-white/80 after:absolute after:inset-0 after:w-[0.125em] after:animate-caret after:bg-blue-600">
            Bienvenue
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium tracking-wide">Portail de Surveillance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Identifiant</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-700 font-medium"
                placeholder="Entrez votre ID"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Mot de passe</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-slate-400 text-slate-700 font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 text-sm font-medium rounded-xl flex items-center gap-3 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;