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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {motos.map((moto) => (
            <div
              key={moto.id}
              className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden hover:border-red-500 hover:scale-[1.02] transition-all duration-300"
            >
              {moto.imagem && (
                <img
                  src={moto.imagem}
                  alt={moto.nome}
                  className="w-full h-44 object-contain bg-white"
                  onClick={() => onSeeDetailsClick(moto)}
                />
              )}
              <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors" type="button"
          ></button>
              <div className="p-4">
                <h2 className="text-white font-semibold text-lg">{moto.nome}</h2>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gray-400 text-sm">{moto.marca}</span>
                  <span className="bg-red-600/20 text-red-400 text-sm font-medium px-2 py-0.5 rounded-full">
                    {moto.ano}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
  
    )
}export default MotosResults