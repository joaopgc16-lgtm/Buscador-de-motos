function ModalAviso({ titulo, mensagem, aoFechar }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={aoFechar}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm rounded-2xl border border-gray-700 bg-gray-900 p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          ✕
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-2xl text-green-400">
          ✓
        </div>

        <h2 className="mb-2 text-xl font-bold text-white">{titulo}</h2>
        <p className="mb-6 text-gray-300">{mensagem}</p>

        <button
          type="button"
          onClick={aoFechar}
          className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default ModalAviso