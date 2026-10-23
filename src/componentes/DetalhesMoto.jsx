import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { API } from '../api'

function DetalhesMoto() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate()
  const [moto, setMoto] = useState(null)
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-red-400 mb-6 transition-colors"
        >
          ← Voltar
        </button>

        {carregando && (
          <p className="text-center text-gray-400 animate-pulse">Carregando...</p>
        )}

        {erro && (
          <p className="text-center text-red-400 bg-red-950/40 border border-red-800 rounded-xl py-3 px-4">
            {erro}
          </p>
        )}

        {moto && (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
            <div className="relative">
              {moto.imagem ? (
                <img
                  src={moto.imagem}
                  alt={moto.nome}
                  className="w-full max-h-96 object-contain bg-white"
                />
              ) : (
                <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-600 text-sm">
                  Sem imagem
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600" />
            </div>

            <div className="p-6">
              <h1 className="text-white text-2xl font-bold tracking-tight">{moto.nome}</h1>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400">{moto.marca}</span>
                <span className="bg-red-600/20 text-red-400 text-sm font-medium px-3 py-1 rounded-full">
                  {moto.ano}
                </span>
              </div>

              <h2 className="text-lg font-semibold mt-8 mb-3 text-red-500">Descrição</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {moto.descricao || 'Descrição ainda não cadastrada.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetalhesMoto