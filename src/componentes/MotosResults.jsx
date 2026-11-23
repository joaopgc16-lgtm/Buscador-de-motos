import { useNavigate } from "react-router-dom";

function MotosResults({motos}){
  const navigate = useNavigate()
          function onSeeDetailsClick(moto) {
          const query = new URLSearchParams()
          query.set('id', moto.id)
          query.set('nome', moto.nome)
          navigate(`/moto?${query.toString()}`)
        }
    return(
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {motos.map((moto) => (
    <article
      key={moto.id}
      role="link"
      tabIndex={0}
      onClick={() => onSeeDetailsClick(moto)}
      onKeyDown={(e) => { if (e.key === 'Enter') onSeeDetailsClick(moto) }}
      className="cursor-pointer overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/60 transition-all duration-300 hover:border-red-500 motion-safe:hover:scale-[1.02] focus:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500"
    >
      {moto.imagem && (
        <img
          src={moto.imagem}
          alt={moto.nome}
          loading="lazy"
          className="aspect-[4/3] w-full bg-white object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold text-white">{moto.nome}</h2>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-sm text-gray-400">{moto.marca}</span>
          <span className="rounded-full bg-red-600/20 px-2 py-0.5 text-sm font-medium text-red-400">
            {moto.ano}
          </span>
        </div>
      </div>
    </article>
  ))}
</div>
  
    )
}export default MotosResults