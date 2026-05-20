import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import FirebaseWarning from '../../components/FirebaseWarning'
import AdminPanel from './AdminPanel'

export default function AdminLogin() {
  const { user, login, loading: authLoading, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (authLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-slate-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#003d6b] border-t-transparent" />
      </div>
    )
  }

  if (user) {
    return <AdminPanel />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch {
      setError('E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-[#0a1628] to-[#003d6b] px-4">
      <div className="w-full max-w-sm">
        {!isFirebaseConfigured && <FirebaseWarning />}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-2xl"
        >
          <h1 className="text-xl font-bold text-slate-900">Login admin</h1>
          <p className="mt-1 text-sm text-slate-500">Acesso somente para você.</p>

          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!isFirebaseConfigured}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#00a86b] focus:ring-2 focus:ring-[#00a86b]/20"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!isFirebaseConfigured}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#00a86b] focus:ring-2 focus:ring-[#00a86b]/20"
            />
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !isFirebaseConfigured}
            className="mt-6 w-full rounded-lg bg-[#003d6b] py-3 font-semibold text-white hover:bg-[#0a1628] disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <Link to="/" className="mt-4 block text-center text-sm text-slate-500 hover:text-[#003d6b]">
            Voltar
          </Link>
        </form>
      </div>
    </div>
  )
}
