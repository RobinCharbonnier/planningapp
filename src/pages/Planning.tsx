import { useState, useRef } from 'react'
import ShiftCard from '../components/ShiftCard'
import {
  currentUser,
  employees,
  getShiftsForDate,
  getShiftsForEmployee,
  WEEK_DATES,
  DAY_LABELS_SHORT,
} from '../data/mockData'

const TODAY = '2026-03-06'

type PlanningView = 'mes-shifts' | 'equipe'

function getDayLabel(dateStr: string): { short: string; num: number } {
  const d = new Date(dateStr + 'T12:00:00')
  const dayIndex = d.getDay() === 0 ? 6 : d.getDay() - 1
  return { short: DAY_LABELS_SHORT[dayIndex], num: d.getDate() }
}

export default function Planning() {
  const [view, setView] = useState<PlanningView>('equipe')
  const [selectedDate, setSelectedDate] = useState(TODAY)
  const [showCalendar, setShowCalendar] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)

  const shiftsForDay =
    view === 'equipe'
      ? getShiftsForDate(selectedDate)
      : getShiftsForEmployee(currentUser.id, selectedDate)

  const eventNames: Record<string, string> = {
    '2026-03-02': 'Blues Session',
    '2026-03-04': 'Jam Session Ouverte',
    '2026-03-05': 'Concert Trio Diaz',
    '2026-03-06': 'Grande Nuit Jazz',
    '2026-03-07': 'Soiree Manouche',
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-0 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-800">38Riv Jazz Club</h1>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button onClick={() => setShowCalendar(!showCalendar)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {/* Toggle Mes shifts / Equipe */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-4 w-fit mx-auto">
          <button
            onClick={() => setView('mes-shifts')}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
              view === 'mes-shifts' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            Mes shifts
          </button>
          <button
            onClick={() => setView('equipe')}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
              view === 'equipe' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            Equipe(s)
          </button>
        </div>

        {/* Day strip */}
        <div ref={stripRef} className="flex items-center gap-1 overflow-x-auto scrollable pb-3 px-1">
          {WEEK_DATES.map((date) => {
            const { short, num } = getDayLabel(date)
            const isSelected = date === selectedDate
            const isToday = date === TODAY
            const hasShifts = getShiftsForDate(date).length > 0

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                  isSelected ? 'text-amber-600' : 'text-slate-500'
                }`}
              >
                <span className="text-xs font-medium">{short}.</span>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                    isSelected
                      ? 'bg-amber-600 text-white'
                      : isToday
                      ? 'border-2 border-amber-600 text-amber-600'
                      : 'text-slate-700'
                  }`}
                >
                  {num}
                </div>
                {hasShifts && !isSelected && (
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                )}
                {(!hasShifts || isSelected) && <div className="w-1 h-1" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 page-enter">
        {/* Event badge for the day */}
        {eventNames[selectedDate] && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4">
            <span className="text-base">🎷</span>
            <div>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Concert du soir</p>
              <p className="text-sm text-slate-800 font-semibold">{eventNames[selectedDate]}</p>
            </div>
          </div>
        )}

        {shiftsForDay.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">🎵</span>
            <p className="text-slate-500 font-medium">
              {view === 'mes-shifts'
                ? "Vous n'avez aucun shift prevu ce jour"
                : "Aucun shift programme ce jour"}
            </p>
          </div>
        ) : (
          <div>
            {view === 'equipe' ? (
              // Grouped by role
              <>
                {/* Affichage par categories */}
                {['Ingenieur Son', 'Technicien Lumiere', 'Musicien(ne)', 'Hotesse/Hote', 'Caissier/Caissiere', 'Barman/Barmaid', 'Serveur/Serveuse', 'Directeur'].map((role) => {
                  const roleShifts = shiftsForDay.filter((s) => {
                    const emp = employees.find((e) => e.id === s.employeeId)
                    return emp?.role === role
                  })
                  if (roleShifts.length === 0) return null
                  return (
                    <div key={role} className="mb-4">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{role}</h3>
                      {roleShifts.map((shift) => (
                        <ShiftCard key={shift.id} shift={shift} showEmployee showLabel />
                      ))}
                    </div>
                  )
                })}
              </>
            ) : (
              shiftsForDay.map((shift) => (
                <ShiftCard key={shift.id} shift={shift} showEmployee={false} showLabel />
              ))
            )}
          </div>
        )}
      </div>

      {/* Legende roles */}
      {view === 'equipe' && shiftsForDay.length > 0 && (
        <div className="px-4 pb-4">
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Effectif du soir</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(
                new Set(
                  shiftsForDay
                    .map((s) => employees.find((e) => e.id === s.employeeId)?.role)
                    .filter(Boolean)
                )
              ).map((role) => {
                const count = shiftsForDay.filter((s) => {
                  const emp = employees.find((e) => e.id === s.employeeId)
                  return emp?.role === role
                }).length
                return (
                  <span key={role} className="text-xs bg-gray-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                    {role} ({count})
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
