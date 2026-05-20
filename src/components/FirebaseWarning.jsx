export default function FirebaseWarning() {
  const isProd = import.meta.env.PROD

  return (
    <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <p className="font-semibold">Firebase não configurado</p>
      {isProd ? (
        <p className="mt-1">
          No deploy (Vercel), adicione as variáveis <code className="rounded bg-amber-100 px-1">VITE_FIREBASE_*</code> em{' '}
          <strong>Settings → Environment Variables</strong> e faça um novo deploy.
        </p>
      ) : (
        <p className="mt-1">
          Crie o arquivo <code className="rounded bg-amber-100 px-1">.env</code> na pasta{' '}
          <code className="rounded bg-amber-100 px-1">fullstackEmails</code>, reinicie com{' '}
          <code className="rounded bg-amber-100 px-1">npm run dev</code> (pare o servidor antes com Ctrl+C).
        </p>
      )}
    </div>
  )
}
