import { useState } from 'react'
import { currentUser } from '../data/mockData'

type CompteSection = 'profil' | 'rh' | 'documents' | 'password' | null

export default function Compte() {
  const [activeSection, setActiveSection] = useState<CompteSection>(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  if (activeSection === 'profil') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mon profil</h1>
        </div>

        <div className="px-4 pt-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center mb-3">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="text-lg font-bold text-slate-800">{currentUser.firstName} {currentUser.lastName}</h2>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full mt-1">
              {currentUser.role}
            </span>
          </div>

          {/* Infos */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {[
              { label: 'Prenom', value: currentUser.firstName },
              { label: 'Nom', value: currentUser.lastName },
              { label: 'Email', value: 'robin.dumont@38riv.fr' },
              { label: 'Tel', value: '+33 6 12 34 56 78' },
              { label: 'Etablissement', value: '38Riv Jazz Club' },
              { label: 'Poste', value: currentUser.role },
            ].map((item, i, arr) => (
              <div key={item.label} className={`px-4 py-3.5 flex items-center justify-between ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <span className="text-xs font-medium text-slate-400 w-28">{item.label}</span>
                <span className="text-sm font-medium text-slate-800 text-right">{item.value}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 rounded-2xl border border-amber-600 text-sm font-semibold text-amber-600">
            Modifier mes informations
          </button>
        </div>
      </div>
    )
  }

  if (activeSection === 'rh') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Ma fiche RH</h1>
        </div>

        <div className="px-4 pt-5 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-gray-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Contrat</p>
            </div>
            {[
              { label: 'Type de contrat', value: 'CDI' },
              { label: 'Date debut', value: '01/06/2023' },
              { label: 'Temps de travail', value: '39h / semaine' },
              { label: 'Convention collective', value: 'HCR (Hotellerie Restauration)' },
            ].map((item, i, arr) => (
              <div key={item.label} className={`px-4 py-3.5 flex items-center justify-between ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <span className="text-xs font-medium text-slate-400">{item.label}</span>
                <span className="text-sm font-medium text-slate-800 text-right">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-gray-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Coordonnees bancaires</p>
            </div>
            {[
              { label: 'IBAN', value: 'FR76 ···· ···· ···· 4821' },
              { label: 'BIC', value: 'BNPAFRPP' },
            ].map((item, i, arr) => (
              <div key={item.label} className={`px-4 py-3.5 flex items-center justify-between ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <span className="text-xs font-medium text-slate-400">{item.label}</span>
                <span className="text-sm font-medium text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>

          <button className="w-full py-3 rounded-2xl border border-amber-600 text-sm font-semibold text-amber-600">
            Modifier mes informations RH
          </button>
        </div>
      </div>
    )
  }

  if (activeSection === 'documents') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mes documents</h1>
        </div>

        <div className="px-4 pt-5 space-y-3">
          {[
            { name: 'Contrat de travail CDI', date: '01/06/2023', icon: '📄', type: 'PDF' },
            { name: 'Fiche de paie - Fevrier 2026', date: '28/02/2026', icon: '💰', type: 'PDF' },
            { name: 'Fiche de paie - Janvier 2026', date: '31/01/2026', icon: '💰', type: 'PDF' },
            { name: 'Fiche de paie - Decembre 2025', date: '31/12/2025', icon: '💰', type: 'PDF' },
            { name: 'Attestation employeur', date: '15/01/2026', icon: '📋', type: 'PDF' },
          ].map((doc) => (
            <button key={doc.name} className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{doc.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{doc.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{doc.date} · {doc.type}</p>
              </div>
              <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (activeSection === 'password') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mot de passe</h1>
        </div>

        <div className="px-4 pt-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Mot de passe actuel</label>
              <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-gray-50" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Nouveau mot de passe</label>
              <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-gray-50" placeholder="••••••••" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-1.5">Confirmer le nouveau mot de passe</label>
              <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-700 bg-gray-50" placeholder="••••••••" />
            </div>
            <button className="w-full py-3 rounded-2xl bg-amber-600 text-sm font-semibold text-white mt-2">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main compte screen
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">Compte</h1>
      </div>

      <div className="px-4 pt-5 space-y-3">
        {/* Mon profil */}
        <button
          onClick={() => setActiveSection('profil')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">😊</span>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Mon profil</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Vos identifiants 38Riv et vos informations de contact.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Ma fiche RH */}
        <button
          onClick={() => setActiveSection('rh')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">📦</span>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Ma fiche RH</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Vos informations personnelles securisees et modifiables : coordonnees, RIB...
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mes documents */}
        <button
          onClick={() => setActiveSection('documents')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">📂</span>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Mes documents</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Vos documents utiles, contractuels et personnels.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mot de passe */}
        <button
          onClick={() => setActiveSection('password')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🔐</span>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Mot de passe</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Modifiez-le a tout moment pour securiser l'acces a votre compte.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Se deconnecter */}
        <div className="pt-2">
          {!showLogoutConfirm ? (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full text-center text-base font-semibold text-amber-600 py-3"
            >
              Me deconnecter
            </button>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-sm font-semibold text-slate-800 text-center mb-4">
                Voulez-vous vraiment vous deconnecter ?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-slate-600"
                >
                  Annuler
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-red-500 text-sm font-semibold text-white">
                  Deconnecter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Jazz branding footer */}
        <div className="flex flex-col items-center pt-2 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">🎷</span>
            <span className="text-sm font-bold text-slate-700">38Riv Jazz Club</span>
          </div>
          <p className="text-xs text-slate-400">v1.0.0 · Planning &amp; RH</p>
        </div>
      </div>
    </div>
  )
}
