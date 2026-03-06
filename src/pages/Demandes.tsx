import { useState } from 'react'

type DemandeSection = 'conges' | 'dispos' | 'remplacements' | null

interface CongeRequest {
  id: string
  startDate: string
  endDate: string
  type: string
  status: 'approuve' | 'en-attente' | 'refuse'
  days: number
}

interface Dispo {
  id: string
  date: string
  status: 'disponible' | 'indisponible' | 'partiel'
  note?: string
}

interface Remplacement {
  id: string
  from: string
  shiftDate: string
  shiftTime: string
  type: 'recu' | 'envoye'
  status: 'en-attente' | 'accepte' | 'refuse'
}

const congeRequests: CongeRequest[] = [
  { id: 'c1', startDate: '20/03/2026', endDate: '22/03/2026', type: 'Conges payes', status: 'approuve', days: 3 },
  { id: 'c2', startDate: '14/04/2026', endDate: '18/04/2026', type: 'Conges payes', status: 'en-attente', days: 5 },
]

const dispos: Dispo[] = [
  { id: 'd1', date: '2026-03-09', status: 'indisponible', note: 'Deplacement perso' },
  { id: 'd2', date: '2026-03-13', status: 'partiel', note: 'Disponible apres 20h' },
  { id: 'd3', date: '2026-03-16', status: 'disponible' },
]

const remplacements: Remplacement[] = [
  {
    id: 'r1',
    from: 'Lucas Bernard',
    shiftDate: 'Sam. 14 mars',
    shiftTime: '18:00 - 02:00',
    type: 'recu',
    status: 'en-attente',
  },
  {
    id: 'r2',
    from: 'Camille Rousseau',
    shiftDate: 'Mer. 11 mars',
    shiftTime: '19:00 - 01:00',
    type: 'envoye',
    status: 'accepte',
  },
]

const statusLabel = {
  'approuve': { text: 'Approuve', cls: 'bg-green-100 text-green-700' },
  'en-attente': { text: 'En attente', cls: 'bg-amber-100 text-amber-700' },
  'refuse': { text: 'Refuse', cls: 'bg-red-100 text-red-700' },
  'accepte': { text: 'Accepte', cls: 'bg-green-100 text-green-700' },
}

const dispoLabel = {
  'disponible': { text: 'Disponible', cls: 'bg-green-100 text-green-700', icon: '✅' },
  'indisponible': { text: 'Indisponible', cls: 'bg-red-100 text-red-700', icon: '❌' },
  'partiel': { text: 'Partiel', cls: 'bg-amber-100 text-amber-700', icon: '🕐' },
}

const dispoDateLabel: Record<string, string> = {
  '2026-03-09': 'Lun. 9 mars',
  '2026-03-13': 'Ven. 13 mars',
  '2026-03-16': 'Lun. 16 mars',
}

export default function Demandes() {
  const [activeSection, setActiveSection] = useState<DemandeSection>(null)
  const [showCongeForm, setShowCongeForm] = useState(false)

  if (activeSection === 'conges') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mes conges</h1>
        </div>

        <div className="px-4 pt-5 space-y-4">
          {/* Soldes */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h2 className="text-sm font-bold text-slate-700 mb-3">Mes soldes</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-medium">Conges 2024-2025</p>
                <p className="text-xl font-bold text-slate-800 mt-1">13 j</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-medium">Conges 2025-2026</p>
                <p className="text-xl font-bold text-slate-800 mt-1">8.5 j</p>
              </div>
            </div>
          </div>

          {/* Mes demandes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-700">Mes demandes</h2>
              <button
                onClick={() => setShowCongeForm(true)}
                className="text-xs font-semibold text-white bg-amber-600 px-3 py-1.5 rounded-full"
              >
                + Nouvelle demande
              </button>
            </div>

            {showCongeForm && (
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-3 border border-amber-200">
                <h3 className="text-sm font-bold text-slate-800 mb-3">Nouvelle demande de conge</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1">Type de conge</label>
                    <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-slate-700 bg-gray-50">
                      <option>Conges payes</option>
                      <option>Conge sans solde</option>
                      <option>RCR</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1">Du</label>
                      <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-slate-700 bg-gray-50" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1">Au</label>
                      <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-slate-700 bg-gray-50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-medium block mb-1">Commentaire (optionnel)</label>
                    <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-slate-700 bg-gray-50 resize-none" rows={2} placeholder="Raison de la demande..." />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCongeForm(false)}
                      className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-medium text-slate-600"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => setShowCongeForm(false)}
                      className="flex-1 py-2 rounded-xl bg-amber-600 text-sm font-semibold text-white"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {congeRequests.map((req) => {
                const st = statusLabel[req.status]
                return (
                  <div key={req.id} className="bg-white rounded-2xl shadow-sm p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{req.type}</p>
                        <p className="text-sm font-bold text-slate-800 mt-0.5">
                          {req.startDate} → {req.endDate}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{req.days} jours</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>
                        {st.text}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeSection === 'dispos') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mes disponibilites</h1>
        </div>

        <div className="px-4 pt-5">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-4">
            <p className="text-xs text-amber-700 font-medium">
              Indiquez vos disponibilites a votre manager pour faciliter la planification des soirees.
            </p>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-700">Mes indications</h2>
            <button className="text-xs font-semibold text-white bg-amber-600 px-3 py-1.5 rounded-full">
              + Ajouter
            </button>
          </div>

          <div className="space-y-3">
            {dispos.map((d) => {
              const dl = dispoLabel[d.status]
              return (
                <div key={d.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
                  <span className="text-xl">{dl.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{dispoDateLabel[d.date]}</p>
                    {d.note && <p className="text-xs text-slate-400 mt-0.5">{d.note}</p>}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${dl.cls}`}>
                    {dl.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (activeSection === 'remplacements') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Mes remplacements</h1>
        </div>

        <div className="px-4 pt-5">
          {/* Recus */}
          <h2 className="text-sm font-bold text-slate-700 mb-3">Demandes recues</h2>
          {remplacements.filter((r) => r.type === 'recu').map((r) => {
            const st = statusLabel[r.status]
            return (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm p-4 mb-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-400">De : <span className="font-semibold text-slate-600">{r.from}</span></p>
                    <p className="text-sm font-bold text-slate-800 mt-1">{r.shiftDate}</p>
                    <p className="text-xs text-slate-500">{r.shiftTime}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>
                    {st.text}
                  </span>
                </div>
                {r.status === 'en-attente' && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 rounded-xl border border-red-200 text-xs font-semibold text-red-600">
                      Refuser
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-amber-600 text-xs font-semibold text-white">
                      Accepter
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          {/* Envoyes */}
          <h2 className="text-sm font-bold text-slate-700 mb-3 mt-4">Demandes envoyees</h2>
          {remplacements.filter((r) => r.type === 'envoye').map((r) => {
            const st = statusLabel[r.status]
            return (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm p-4 mb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400">A : <span className="font-semibold text-slate-600">{r.from}</span></p>
                    <p className="text-sm font-bold text-slate-800 mt-1">{r.shiftDate}</p>
                    <p className="text-xs text-slate-500">{r.shiftTime}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.cls}`}>
                    {st.text}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Main Demandes screen
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-5 pt-12 pb-5 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800">Demandes</h1>
      </div>

      <div className="px-4 pt-5 space-y-3">
        {/* Mes conges */}
        <button
          onClick={() => setActiveSection('conges')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🌴</span>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Mes conges</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Planifiez et faites valider vos jours de repos en quelques clics.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mes disponibilites */}
        <button
          onClick={() => setActiveSection('dispos')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">👍</span>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Mes disponibilites</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Indiquez a votre manager quand vous etes disponible pour les soirees.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Mes remplacements */}
        <button
          onClick={() => setActiveSection('remplacements')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🔄</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800">Mes remplacements</h2>
              <span className="bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Retrouvez toutes vos demandes recues et envoyees pour un remplacement de shift.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Decoration jazz */}
        <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
          <div className="absolute -right-4 -bottom-4 text-[80px] opacity-10">🎷</div>
          <p className="text-white font-bold text-sm mb-1">38Riv Jazz Club</p>
          <p className="text-slate-400 text-xs">Gestion des plannings &amp; equipes</p>
          <div className="flex gap-2 mt-3">
            <div className="bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Saison 2025-2026
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
