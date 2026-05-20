export default function FirebaseWarning() {
  return (
    <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <p className="font-semibold">Firebase não configurado</p>
      <p className="mt-1">
        Crie o arquivo <code className="rounded bg-amber-100 px-1">.env</code> seguindo{' '}
        <strong>CONFIGURACAO.md</strong> e reinicie o servidor.
      </p>
    </div>
  )
}
