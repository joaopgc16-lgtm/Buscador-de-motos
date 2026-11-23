import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Bike, Calendar, Tag, AlertTriangle } from 'lucide-react'
import { API } from '../api'

function Esqueleto() {
  return (
    <div className="animate-pulse overflow-hidden bg-[#161927] sm:rounded-2xl sm:border sm:border-white/[0.07]">
      <div className="aspect-[4/3] bg-[#1e2133] sm:aspect-[16/10]" />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 rounded-xl bg-[#1e2133]" />
          <div className="h-16 rounded-xl bg-[#1e2133]" />
        </div>
        <div className="h-4 w-full rounded bg-[#1e2133]" />
        <div className="h-4 w-5/6 rounded bg-[#1e2133]" />
      </div>
    </div>
  )
}

function Info({ icone: Icone, rotulo, valor }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#1e2133] p-3 sm:gap-3 sm:p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-400 sm:h-10 sm:w-10">
        <Icone size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#8a8fa8] sm:text-xs">{rotulo}</p>
        <p className="truncate text-sm font-semibold text-white sm:text-base">{valor}</p>
      </div>
    </div>
  )
}

function DetalhesMoto() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const navigate = useNavigate()
  const [moto, setMoto] = useState(null)
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [imagemFalhou, setImagemFalhou] = useState(false)

  useEffect(() => {
    setCarregando(true)
    setErro(null)
    setImagemFalhou(false)

    fetch(`${API}/motos/${id}`)
      .then(async (resposta) => {
        const dados = await resposta.json().catch(() => ({}))
        if (!resposta.ok) {
          throw new Error(dados.mensagem_de_erro || 'Não foi possível carregar a moto')
        }
        return dados
      })
      .then(setMoto)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false))
  }, [id])

  const temImagem = moto?.imagem && !imagemFalhou

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#0b0d17] to-[#10131f] pb-[env(safe-area-inset-bottom)] sm:px-4 sm:py-12">
      <div className="mx-auto max-w-2xl">

        {/* Barra superior fixa no mobile, fácil de alcançar com o polegar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 bg-[#0b0d17]/85 px-4 py-3 backdrop-blur sm:static sm:mb-6 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Voltar"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.07] bg-[#161927] px-4 text-sm font-medium text-[#8a8fa8] transition-all active:scale-95 hover:border-red-500/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Voltar
          </button>
        </div>

        {carregando && <Esqueleto />}

        {erro && (
          <div className="mx-4 flex flex-col items-center gap-3 rounded-2xl border border-red-500/30 bg-red-950/30 px-5 py-8 text-center sm:mx-0 sm:px-6">
            <AlertTriangle className="text-red-400" size={32} />
            <p className="text-sm text-red-300 sm:text-base">{erro}</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="h-11 w-full rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition-colors active:scale-95 hover:bg-red-500 sm:w-auto"
            >
              Voltar para a lista
            </button>
          </div>
        )}

        {moto && (
          <article className="overflow-hidden bg-[#161927] motion-safe:animate-[entrar_0.5s_ease-out_backwards] sm:rounded-2xl sm:border sm:border-white/[0.07] sm:shadow-[0_28px_90px_rgba(0,0,0,0.5)]">

            {/* Imagem: largura total no mobile, sem bordas arredondadas */}
            <div className="relative aspect-[4/3] overflow-hidden bg-white sm:aspect-[16/10]">
              {temImagem ? (
                <img
                  src={moto.imagem}
                  alt={moto.nome}
                  onError={() => setImagemFalhou(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#1e2133] text-gray-600">
                  <Bike size={48} />
                  <span className="text-sm">Sem imagem</span>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161927] via-[#161927]/30 to-transparent" />

              <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-red-600/30 sm:right-4 sm:top-4 sm:text-sm">
                {moto.ano}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-red-400 sm:mb-1 sm:text-sm">
                  {moto.marca}
                </p>
                <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-white drop-shadow sm:text-3xl md:text-4xl">
                  {moto.nome}
                </h1>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-transparent" />
            </div>

            {/* Conteúdo */}
            <div className="space-y-6 p-4 sm:space-y-8 sm:p-6">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <Info icone={Tag} rotulo="Marca" valor={moto.marca} />
                <Info icone={Calendar} rotulo="Ano" valor={moto.ano} />
              </div>

              <section>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-5 w-1 rounded-full bg-red-600" />
                  <h2 className="text-base font-semibold text-white sm:text-lg">Descrição</h2>
                </div>
                <p className="whitespace-pre-line break-words text-[15px] leading-relaxed text-gray-300 sm:text-base">
                  {moto.descricao || (
                    <span className="italic text-[#8a8fa8]">Descrição ainda não cadastrada.</span>
                  )}
                </p>
              </section>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}

export default DetalhesMoto