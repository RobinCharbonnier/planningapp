import { useState } from 'react'
import { employees, shifts, WEEK_DATES, DAY_LABELS_SHORT } from '../data/mockData'

const WEEK_LABEL = 'S10 — 2 au 8 mars 2026'

function getHoursForDay(employeeId: string, date: string): number {
  return shifts
    .filter((s) => s.employeeId === employeeId && s.date === date)
    .reduce((sum, s) => sum + s.durationH, 0)
}

function getTotalHours(employeeId: string): number {
  return WEEK_DATES.reduce((sum, date) => sum + getHoursForDay(employeeId, date), 0)
}

function exportCSV() {
  const headers = ['Prenom', 'Nom', 'Role', ...WEEK_DATES.map((d, i) => {
    const date = new Date(d + 'T12:00:00')
    return `${DAY_LABELS_SHORT[i]} ${date.getDate()}/0${date.getMonth() + 1}`
  }), 'Total heures']

  const rows = employees.map((emp) => {
    const daily = WEEK_DATES.map((d) => {
      const h = getHoursForDay(emp.id, d)
      return h > 0 ? h.toString().replace('.', ',') : '0'
    })
    const total = getTotalHours(emp.id)
    return [emp.firstName, emp.lastName, emp.role, ...daily, total.toString().replace('.', ',')]
  })

  const csv = [headers, ...rows].map((row) => row.join(';')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `38riv_heures_S10_mars2026.csv`
  a.click()
  URL.revokeObjectURL(url)
}

type AdminSection = null | 'heures' | 'equipe'

export default function Admin() {
  const [section, setSection] = useState<AdminSection>(null)
  const [exportDone, setExportDone] = useState(false)

  function handleExport() {
    exportCSV()
    setExportDone(true)
    setTimeout(() => setExportDone(false), 2500)
  }

  if (section === 'heures') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Decompte heures</h1>
              <p className="text-xs text-slate-400">{WEEK_LABEL}</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              exportDone ? 'bg-green-500 text-white' : 'bg-amber-600 text-white'
            }`}
          >
            {exportDone ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Exporte !
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                CSV Paie
              </>
            )}
          </button>
        </div>

        <div className="px-4 pt-4 space-y-3">
          {/* Info banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-700 font-medium">
              Le fichier CSV exporté est compatible Excel / logiciels de paie (séparateur : point-virgule, encodage UTF-8).
            </p>
          </div>

          {/* Per employee cards */}
          {employees.map((emp) => {
            const total = getTotalHours(emp.id)
            if (total === 0) return null
            return (
              <div key={emp.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{emp.firstName} {emp.lastName}</p>
                    <p className="text-xs text-slate-400">{emp.role}</p>
                  </div>
                  <span className="text-lg font-bold text-amber-600">{total}h</span>
                </div>
                <div className="grid grid-cols-7 divide-x divide-gray-50">
                  {WEEK_DATES.map((date, i) => {
                    const h = getHoursForDay(emp.id, date)
                    const dayNum = new Date(date + 'T12:00:00').getDate()
                    return (
                      <div key={date} className="flex flex-col items-center py-2.5 px-1">
                        <span className="text-[9px] text-slate-400 font-medium">{DAY_LABELS_SHORT[i]}</span>
                        <span className="text-[9px] text-slate-300 mb-1">{dayNum}</span>
                        <span className={`text-xs font-bold ${h > 0 ? 'text-slate-700' : 'text-gray-200'}`}>
                          {h > 0 ? `${h}h` : '—'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Totaux */}
          <div className="bg-slate-900 rounded-2xl px-4 py-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Totaux semaine</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 rounded-xl px-3 py-3">
                <p className="text-xs text-slate-400">Employes actifs</p>
                <p className="text-2xl font-bold text-white mt-0.5">
                  {employees.filter((e) => getTotalHours(e.id) > 0).length}
                </p>
              </div>
              <div className="bg-amber-600 rounded-xl px-3 py-3">
                <p className="text-xs text-amber-200">Total heures</p>
                <p className="text-2xl font-bold text-white mt-0.5">
                  {employees.reduce((sum, e) => sum + getTotalHours(e.id), 0)}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'equipe') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white px-5 pt-12 pb-4 shadow-sm flex items-center gap-3">
          <button onClick={() => setSection(null)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">Equipe ({employees.length} employes)</h1>
        </div>

        <div className="px-4 pt-4 space-y-2">
          {employees.map((emp) => (
            <div key={emp.id} className="bg-white rounded-2xl shadow-sm px-4 py-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: emp.color + '22' }}>
                <span className="text-xl">{emp.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800">{emp.firstName} {emp.lastName}</p>
                <p className="text-xs text-slate-400">{emp.role}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-amber-600">{getTotalHours(emp.id)}h</p>
                <p className="text-xs text-slate-400">cette sem.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Main admin dashboard
  const totalHours = employees.reduce((sum, e) => sum + getTotalHours(e.id), 0)
  const activeEmployees = employees.filter((e) => getTotalHours(e.id) > 0).length

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-5 pt-12 pb-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Administration</h1>
            <p className="text-xs text-slate-400 mt-0.5">{WEEK_LABEL}</p>
          </div>
          <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2.5 py-1 rounded-full">Admin</span>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-3">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl shadow-sm px-4 py-4">
            <p className="text-xs text-slate-400 font-medium">Employes actifs</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{activeEmployees}</p>
            <p className="text-xs text-slate-400">sur {employees.length} au total</p>
          </div>
          <div className="bg-amber-600 rounded-2xl px-4 py-4">
            <p className="text-xs text-amber-200 font-medium">Total heures S10</p>
            <p className="text-3xl font-bold text-white mt-1">{totalHours}h</p>
            <p className="text-xs text-amber-200">semaine courante</p>
          </div>
        </div>

        {/* Decompte heures + export */}
        <button
          onClick={() => setSection('heures')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Decompte heures & paie</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Heures par employe, par jour. Export CSV compatible logiciel de paie.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Equipe */}
        <button
          onClick={() => setSection('equipe')}
          className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-800">Vue equipe complete</h2>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
              Tous les employes, leurs roles et leurs heures de la semaine.
            </p>
          </div>
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Info */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5">
          <div className="absolute -right-4 -bottom-4 text-[80px] opacity-10">🎷</div>
          <p className="text-white font-bold text-sm mb-1">38Riv Jazz Club — Admin</p>
          <p className="text-slate-400 text-xs">Acces administrateur · Donnees confidentielles</p>
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
