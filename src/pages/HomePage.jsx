import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EMAIL_REGEX } from '../constants'
import { saveEmail } from '../services/emails'
import { isFirebaseConfigured } from '../firebase/config'
import FirebaseWarning from '../components/FirebaseWarning'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const trimmed = email.trim()
    if (!trimmed) {
      setError('Informe seu e-mail.')
      return
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Informe um e-mail válido.')
      return
    }
    if (!isFirebaseConfigured) return

    setLoading(true)
    try {
      const result = await saveEmail(trimmed)
      if (result.success) {
        setSuccess(true)
        setEmail('')
        setTimeout(() => setSuccess(false), 4000)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message || 'Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-[#0a1628] to-[#003d6b] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Fullstack Petrobras</h1>
          <p className="mt-2 text-slate-300">
            Informe seu e-mail para receber os materiais do programa.
          </p>
        </div>

        {!isFirebaseConfigured && <FirebaseWarning />}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-2xl"
        >
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            placeholder="seu.email@exemplo.com"
            disabled={loading || !isFirebaseConfigured}
            className="mb-4 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#00a86b] focus:ring-2 focus:ring-[#00a86b]/20 disabled:opacity-60"
          />

          {error && (
            <p className="mb-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="mb-4 text-sm text-emerald-600" role="status">
              E-mail cadastrado com sucesso!
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !isFirebaseConfigured}
            className="w-full rounded-lg bg-[#003d6b] py-3 font-semibold text-white transition hover:bg-[#0a1628] disabled:opacity-60"
          >
            {loading ? 'Salvando...' : 'Cadastrar'}
          </button>
        </form>

        <Link
          to="/admin"
          className="mt-6 block text-center text-sm text-slate-400 hover:text-white"
        >
          Área admin
        </Link>
      </div>
    </div>
  )
}
