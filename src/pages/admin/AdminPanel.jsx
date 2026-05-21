import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { subscribeToEmails, deleteEmail } from '../../services/emails' // 1. Certifique-se de importar a função de deletar

async function copyText(text) {
  await navigator.clipboard.writeText(text)
}

export default function AdminPanel() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const [emails, setEmails] = useState([])
  const [copied, setCopied] = useState('')

  useEffect(() => subscribeToEmails(setEmails), [])

  const allEmailsText = emails.map((e) => e.email).join('\n')

  const handleCopyAll = async () => {
    if (emails.length === 0) return
    await copyText(allEmailsText)
    setCopied('todos')
    setTimeout(() => setCopied(''), 2000)
  }

  const handleCopyOne = async (email) => {
    await copyText(email)
    setCopied(email)
    setTimeout(() => setCopied(''), 2000)
  }

  // 2. Nova função para deletar o e-mail
  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja remover este e-mail?')
    if (!confirmar) return

    try {
      // Se o seu subscribeToEmails for em tempo real (ex: Realtime Database ou Firestore onSnapshot),
      // a lista vai se atualizar sozinha. Caso contrário, descomente a linha do setEmails abaixo.
      await deleteEmail(id)
      
      // setEmails(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error('Erro ao deletar e-mail:', error)
      alert('Não foi possível remover o e-mail. Tente novamente.')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-svh bg-slate-100">
      <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">E-mails cadastrados</h1>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopyAll}
              disabled={emails.length === 0}
              className="rounded-lg bg-[#00a86b] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {copied === 'todos' ? 'Copiado!' : `Copiar todos (${emails.length})`}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
        <p className="mb-4 text-sm text-slate-600">
          Use <strong>Copiar todos</strong> e cole no Google Drive ou Planilhas (um
          e-mail por linha).
        </p>

        {emails.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">
            Nenhum e-mail cadastrado ainda.
          </p>
        ) : (
          <ul className="space-y-2">
            {emails.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <span className="text-slate-400 tabular-nums">{index + 1}.</span>
                <span className="flex-1 truncate font-medium text-slate-800">
                  {item.email}
                </span>
                
                {/* Agrupando os botões de ação à direita */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyOne(item.email)}
                    className="text-sm font-medium text-[#003d6b] hover:underline"
                  >
                    {copied === item.email ? 'Copiado!' : 'Copiar'}
                  </button>
                  
                  {/* 3. Botão da Lixeira (Trashcan) */}
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Excluir e-mail"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {emails.length > 0 && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-medium text-slate-700">
              Pré-visualização (cole no Drive)
            </p>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              {allEmailsText}
            </pre>
          </div>
        )}
      </main>
    </div>
  )
}