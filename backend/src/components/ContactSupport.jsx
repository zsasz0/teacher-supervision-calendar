import React, { useState } from "react";

const ContactSupport = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: ""
    });
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }

        setSending(true);
        setSuccessMessage("");

        try {
            let emailBody = `DEMANDE DE SUPPORT\n`;
            emailBody += `================================================\n\n`;
            emailBody += `De: ${formData.name}\n`;
            emailBody += `Email: ${formData.email}\n`;
            emailBody += `Téléphone: ${formData.phone || 'Non fourni'}\n`;
            emailBody += `Intéressé par: ${formData.interest || 'Non spécifié'}\n\n`;
            emailBody += `Message:\n`;
            emailBody += `${formData.message}\n`;

            const res = await fetch("http://localhost:9999/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: "ttitchalav3@gmail.com",
                    subject: `[Contact] Message de ${formData.name}`,
                    body: emailBody
                })
            });

            if (res.ok) {
                setSuccessMessage("Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    interest: "",
                    message: ""
                });
            } else {
                alert("Erreur lors de l'envoi du message");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'envoi du message (Serveur injoignable)");
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white flex flex-col lg:flex-row [background:linear-gradient(45deg,#ffffff,theme(colors.slate.50)_50%,#ffffff)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.200/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.200/.48))_border-box] border-2 border-transparent animate-border">

                {/* Left Side - Contact Info */}
                <div className="lg:w-5/12 bg-blue-900 text-white p-10 md:p-14 relative overflow-hidden flex flex-col justify-between">

                    {/* Animated Blobs */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Informations de Contact</h3>
                        <p className="text-blue-100 text-lg mb-10 font-light leading-relaxed">
                            Vous avez des questions sur la surveillance des examens ou besoin d'assistance ? Contactez-nous et notre équipe vous répondra rapidement.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200 font-semibold uppercase tracking-wider">Appelez-nous</p>
                                    <p className="text-lg">+216 XX XXX XXX</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200 font-semibold uppercase tracking-wider">Email</p>
                                    <p className="text-lg">ttitchalav3@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-200 font-semibold uppercase tracking-wider">Localisation</p>
                                    <p className="text-lg leading-tight">Faculté des Sciences Économiques<br />et de Gestion, Campus Universitaire</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center hover:bg-white hover:text-blue-900 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center hover:bg-white hover:text-blue-900 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center hover:bg-white hover:text-blue-900 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:w-7/12 p-10 md:p-14 bg-white relative">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                        Contactez-nous <span className="text-blue-700 italic">maintenant</span>
                    </h2>
                    <p className="text-gray-500 mb-8">Remplissez le formulaire et nous vous répondrons sous 24h.</p>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold text-gray-600">Nom Complet *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jean Dupont"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jean@exemple.com"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-semibold text-gray-600">Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+216 XX XXX XXX"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="interest" className="text-sm font-semibold text-gray-600">Sujet</label>
                                <div className="relative">
                                    <select
                                        id="interest"
                                        name="interest"
                                        value={formData.interest}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all duration-300 appearance-none cursor-pointer"
                                    >
                                        <option value="">Sélectionnez un sujet...</option>
                                        <option value="surveillance">Question sur la surveillance</option>
                                        <option value="calendrier">Calendrier des examens</option>
                                        <option value="technique">Problème technique</option>
                                        <option value="autre">Autre demande</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-gray-600">Votre Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Décrivez votre demande ou problème..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all duration-300 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="group w-full md:w-auto bg-blue-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-800 hover:shadow-blue-900/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {sending ? "Envoi en cours..." : "Envoyer le Message"}
                            {!sending && (
                                <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSupport;
