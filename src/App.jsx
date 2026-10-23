import { API } from './api'

import { useState,} from 'react'
import { useOutletContext } from 'react-router-dom'
import Busca from './componentes/Busca'
import MotosResults from './componentes/MotosResults'

function App() {
 const {busca, setBusca, motos, setMotos} = useOutletContext()
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  

  async function buscarMoto(){
    setErro(null)
    setCarregando(true)
    try{
      const moto = await fetch(`${API}/?motosearch=${busca}`)
      if (!moto.ok) throw new Error("Query parameters execution failed.");
      const results = await moto.json()
      setMotos(results.resultado)
      console.log(results.listas)
    } catch {
      setErro("[ERRO] Falha ao carregar resultados da busca");
    } finally {
      setCarregando(false);
    }
  }


  return (

    <div className="min-h-screen bg-linear-to-b from-gray-950 to-gray-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        <Busca busca={busca} setBusca={setBusca} buscarMoto={buscarMoto}/>
          
        {carregando && (
          <p className="text-center text-gray-400 animate-pulse">Carregando...</p>
        )}

        {erro && (
          <p className="text-center text-red-400 bg-red-950/40 border border-red-800 rounded-xl py-3 px-4 mb-4">
            {erro}
          </p>
        )}

        {!carregando && !erro && motos.length === 0 && (
          <p className="text-center text-gray-500">Nenhum resultado ainda. Faça uma busca acima.</p>
        )}
         
        <MotosResults motos={motos}/>

        </div>
    </div>
  )
}

export default App