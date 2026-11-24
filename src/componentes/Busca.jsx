import { Search, X } from 'lucide-react'

function Busca({ setBusca, buscarMoto, busca }) {
  function enviar(e) {
    e.preventDefault()
    buscarMoto()
  }

  return (
    <div className="w-full">
      <header className="mb-6 text-center sm:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span aria-hidden="true">🏍️ </span>
          Busca de <span className="text-red-500">Motos</span>
        </h1>
        <p className="mt-2 text-sm text-gray-400 sm:text-base">
          Pesquise por nome e ano{' '}
          <span className="whitespace-nowrap text-gray-500">(ex: yzf r6 2006)</span>
        </p>
      </header>

      <form
        onSubmit={enviar}
        role="search"
        className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:gap-2"
      >
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            aria-label="Buscar moto por modelo e ano"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o modelo e ano..."
            className="h-12 w-full rounded-xl border border-white/[0.07] bg-[#1e2133] pl-11 pr-11 text-base text-white outline-none transition-all placeholder:text-gray-500 hover:border-white/[0.12] focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca('')}
              aria-label="Limpar busca"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="h-12 rounded-xl bg-red-600 px-6 font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d17] sm:w-auto"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}

export default Busca