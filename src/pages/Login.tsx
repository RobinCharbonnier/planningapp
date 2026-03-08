import { useState } from 'react'
import JazzLogo from '../components/JazzLogo'
import { loginUser } from '../data/mockData'
import type { Employee } from '../data/mockData'

interface LoginProps {
  onLogin: (employee: Employee, isAdmin: boolean) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = loginUser(email, password)
      setLoading(false)
      if (!result) {
        setError('Email ou mot de passe incorrect.')
        return
      }
      onLogin(result.employee, result.isAdmin)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top branding */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="mb-6">
          <JazzLogo size={100} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">38Riv Jazz Club</h1>
        <p className="text-sm text-slate-400 mb-10">Espace planification & RH</p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5 uppercase tracking-wide">
              Adresse email
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-slate-800 bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              placeholder="prenom.nom@38riv.fr"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5 uppercase tracking-wide">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 pr-12 text-sm text-slate-800 bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-amber-600 text-white font-bold text-sm disabled:opacity-60 transition-all active:scale-[0.98]"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>

      {/* Footer hint */}
      <div className="px-6 pb-10 text-center">
        <p className="text-xs text-slate-400">
          Acces reserve aux employes du 38Riv Jazz Club.
        </p>
        <p className="text-xs text-slate-300 mt-1">
          Mot de passe oublie ? Contactez l'administration.
        </p>
      </div>
    </div>
  )
}
