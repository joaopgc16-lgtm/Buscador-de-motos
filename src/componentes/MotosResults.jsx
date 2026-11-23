import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Bike } from 'lucide-react'

function CardMoto({ moto, indice, aoAbrir }) {
  const [imagemFalhou, setImagemFalhou] = useState(false)
  const temImagem = moto.imagem && !imagemFalhou

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={aoAbrir}
      onKeyDown={(e) => { if (e.key === 'Enter') aoAbrir() }}
      style={{ animationDelay: `${Math.min(indice, 8) * 60}ms` }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161927] shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-[0_16px_40px_rgba(229,62,62,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 motion-safe:animate-[entrar_0.45s_ease-out_backwards]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        {temImagem ? (
          <img
            src={moto.imagem}
            alt={moto.nome}
            loading="lazy"
            onError={() => setImagemFalhou(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#1e2133] text-gray-600">
            <Bike size={44} />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#161927] to-transparent" />

        <span className="absolute left-3 top-3 max-w-[55%] truncate rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {moto.marca}
        </span>
        <span className="absolute right-3 top-3 whitespace-nowrap rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-red-600/30">
          {moto.ano}
        </span>
      </div>

      <div className="p-4">
        <h2 className="truncate text-lg font-bold tracking-tight text-white">{moto.nome}</h2>

        {moto.descricao && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-400">{moto.descricao}</p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-sm font-medium text-red-400">
          <span>Ver detalhes</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  )
}

function MotosResults({ motos }) {
  const navigate = useNavigate()

  function onSeeDetailsClick(moto) {
    const query = new URLSearchParams()
    query.set('id', moto.id)
    query.set('nome', moto.nome)
    navigate(`/moto?${query.toString()}`)
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {motos.map((moto, indice) => (
        <CardMoto
          key={moto.id}
          moto={moto}
          indice={indice}
          aoAbrir={() => onSeeDetailsClick(moto)}
        />
      ))}
    </div>
  )
}

export default MotosResults