import { useState } from 'react'
import JazzLogo from '../components/JazzLogo'
import ShiftCard from '../components/ShiftCard'
import {
  currentUser,
  notifications,
  leaveBalances,
  getShiftsForEmployee,
  getTotalHoursForWeek,
  formatDate,
} from '../data/mockData'
import type { Page } from '../App'

const TODAY = '2026-03-06'
const CURRENT_WEEK = 'S10'
const WEEK_RANGE = 'du 2 au 8 mars 2026'

interface AccueilProps {
  onNavigate: (page: Page) => void
}

export default function Accueil({ onNavigate }: AccueilProps) {
  const [showAllNotifs, setShowAllNotifs] = useState(false)

  const todayShifts = getShiftsForEmployee(currentUser.id, TODAY)
  const weeklyHours = getTotalHoursForWeek(currentUser.id)
  const displayedNotifs = showAllNotifs ? notifications : notifications.slice(0, 1)

  return (
    <div className="min-h-screen bg-jazz-cream pb-24 scrollable overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-5 shadow-sm">
        <div className="flex items-center gap-3">
          <JazzLogo size={40} />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Bonjour {currentUser.firstName} !</h1>
            <p className="text-xs text-slate-400 font-medium">38Riv Jazz Club</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Notifications */}
        <section>
          <h2 className="text-base font-bold text-slate-800 mb-3">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-sm text-slate-400">Vous n'avez pas de notification</p>
          ) : (
            <div className="space-y-2">
              {displayedNotifs.map((notif) => (
                <div
                  key={notif.id}
                  className={`rounded-xl p-3.5 flex gap-3 items-start ${
                    notif.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : notif.type === 'warning'
                      ? 'bg-amber-50 border border-amber-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <span className="text-lg mt-0.5">
                    {notif.type === 'success' ? '✅' : notif.type === 'warning' ? '⚠️' : 'ℹ️'}
                  </span>
                  <p className="text-sm text-slate-700 leading-snug">{notif.message}</p>
                </div>
              ))}
              {notifications.length > 1 && (
                <button
                  onClick={() => setShowAllNotifs(!showAllNotifs)}
                  className="text-sm text-amber-600 font-medium"
                >
                  {showAllNotifs ? 'Voir moins' : `Voir toutes (${notifications.length})`}
                </button>
              )}
            </div>
          )}
        </section>

        {/* Mes shifts aujourd'hui */}
        <section>
          <h2 className="text-base font-bold text-slate-800 mb-3">Mes shifts</h2>
          <div className="bg-gray-50 rounded-2xl p-4">
            {/* Date header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-amber-600">ven.</span>
                <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">6</span>
                </div>
                <span className="text-sm font-semibold text-amber-600">mars 2026</span>
              </div>
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                {CURRENT_WEEK}
              </span>
            </div>

            {todayShifts.length === 0 ? (
              <p className="text-sm text-slate-400">Vous n'avez aucun shift prevu aujourd'hui</p>
            ) : (
              <div>
                {todayShifts.map((shift) => (
                  <ShiftCard key={shift.id} shift={shift} showEmployee={false} showLabel />
                ))}
              </div>
            )}
          </div>

          {/* Lien planning semaine */}
          <button
            onClick={() => onNavigate('planning')}
            className="w-full text-center mt-3 py-2 text-sm font-semibold text-amber-600"
          >
            Voir le planning de la semaine &gt;
          </button>
        </section>

        {/* Mes informations */}
        <section>
          <h2 className="text-base font-bold text-slate-800 mb-3">Mes informations</h2>

          {/* Conges */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-3">
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Conges payes</h3>
              <div className="space-y-3">
                {leaveBalances.map((lb, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🌴</span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{lb.label}</p>
                      <p className="text-xs text-slate-400">Solde</p>
                      <p className="text-sm font-bold text-slate-800">{lb.balanceDays} jours</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">☀️</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Prochain conge paye</p>
                    <p className="text-sm text-slate-500">Vous n'avez aucun conge prevu</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 mx-4 my-2" />

            {/* RCR */}
            <div className="px-4 pb-4">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Repos compensateur (RCR)</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⏳</span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Solde restant au 06/03/2026</p>
                  <p className="text-sm font-bold text-slate-800">0 heures</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total heures semaine */}
          <div className="bg-white rounded-2xl shadow-sm px-4 py-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-800">Mon total d'heures</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">
                {weeklyHours}h
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              {WEEK_RANGE} — {CURRENT_WEEK}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-800">{weeklyHours}h</span>
              <span className="text-sm font-semibold text-green-600">+ 00h00</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Dont {todayShifts.reduce((s, sh) => s + sh.durationH, 0)}h ce soir ({formatDate(TODAY).split(' ').slice(0, 2).join(' ')})</p>
          </div>
        </section>

        {/* Programme de la semaine */}
        <section>
          <h2 className="text-base font-bold text-slate-800 mb-3">Programme de la semaine</h2>
          <div className="space-y-2">
            {[
              { date: 'Lun 2', event: 'Soiree Blues Session', icon: '🎵' },
              { date: 'Mar 3', event: 'Ferme', icon: '🔒' },
              { date: 'Mer 4', event: 'Jam Session Ouverte', icon: '🎸' },
              { date: 'Jeu 5', event: 'Concert Trio Diaz', icon: '🎷' },
              { date: 'Ven 6', event: 'Grande Nuit Jazz - Robin Quartet', icon: '⭐' },
              { date: 'Sam 7', event: 'Soiree Manouche', icon: '🎻' },
              { date: 'Dim 8', event: 'Ferme', icon: '🔒' },
            ].map((prog, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  prog.date === 'Ven 6'
                    ? 'bg-amber-50 border border-amber-200'
                    : prog.event === 'Ferme'
                    ? 'bg-gray-50'
                    : 'bg-white border border-gray-100'
                }`}
              >
                <span className="text-base w-6 text-center">{prog.icon}</span>
                <span className={`text-xs font-semibold w-12 ${prog.date === 'Ven 6' ? 'text-amber-600' : 'text-slate-400'}`}>
                  {prog.date}
                </span>
                <span className={`text-sm font-medium ${prog.event === 'Ferme' ? 'text-slate-400' : 'text-slate-700'}`}>
                  {prog.event}
                </span>
                {prog.date === 'Ven 6' && (
                  <span className="ml-auto text-xs bg-amber-600 text-white px-2 py-0.5 rounded-full">Aujourd'hui</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
