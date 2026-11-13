import { API } from './api'

import { useState,} from 'react'
import { useOutletContext } from 'react-router-dom'
import Busca from './componentes/Busca'
import MotosResults from './componentes/MotosResults'

function App() {
 const {busca, setBusca, motos, setMotos} = useOutletContext()
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [entrar, setEntrar] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastrar, setCadastrar] = useState(false);
  const [email, setEmail] = useState('');
  
  async function cadastro() {
  setErro(null)
  setCarregando(true)
  try {
    const resposta = await fetch(`${API}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha, email })
    })
    const dados = await resposta.json().catch(() => ({}))
    if (!resposta.ok) throw new Error(dados.mensagem_de_erro || 'Falha ao cadastrar usuário.')
    setEntrar(false)
  } catch (e) {
    setErro(e.message)
  } finally {
    setCarregando(false)
  }
}
async function login() {
  setErro(null)
  setCarregando(true)
  try {
    const resposta = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha })
    })
    const dados = await resposta.json().catch(() => ({}))
    if (!resposta.ok) throw new Error(dados.mensagem_de_erro || 'Falha ao realizar login.')
    setEntrar(false)
  } catch (e) {
    setErro(e.message)
  } finally {
    setCarregando(false)
  }
}

  async function buscarMoto(){
    setErro(null)
    setCarregando(true)
    setMotos([])
    try{
      const moto = await fetch(`${API}?motosearch=${busca}`)
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

    <div className="min-h-screen max-w-screen bg-linear-to-b from-gray-950 to-gray-900">

     {entrar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-7 rounded-xl shadow-lg w-full max-w-md">

            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center justify-center mb-6 gap-1  rounded-full h-10 w-70 bg-gray-700">
                <button className={`text-white font-thin px-4 py-2 rounded-full h-10 w-70 whitespace-nowrap ${cadastrar ? "bg-gray-700" : "bg-blue-500"}  `} onClick={() => setCadastrar(false)}>Entrar</button>
                  <button className={`text-white font-stretch-50% px-4 py-2 rounded-full h-10 w-70 whitespace-nowrap ${!cadastrar ? "bg-gray-700" : "bg-blue-500"}  `} onClick={() => setCadastrar(true)}>Cadastrar-se</button>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white mb-1">Usuário</label>
                <input type="text" id="username" onChange={(e) => setUsuario(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500" />
              </div>
              {cadastrar &&( 
                  <div className="mb-4">
                <label htmlFor='email' className="block text-white mb-1">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500" />
              </div>
              )}
              <div className="mb-4">
                <label htmlFor="password" className="block text-white mb-1">Senha</label>
                <input type="password" id="password" onChange={(e) => setSenha(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500" />
              </div>
            </form>
            <div className="flex justify-end">
              <button onClick={() => setEntrar(false)} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg mr-2">Cancelar</button>
              <button {...cadastrar ? { onClick: () => { cadastro(); setCadastrar(false) } } : { onClick: () => login() }} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-lg font-bold tracking-tight text-white">
            🏍️ <span className="text-red-500">Motos</span>
          </span>

          <button
            type="button"
            onClick={() => setEntrar(true)}
            className="rounded-xl border border-red-600 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            Entrar
          </button>
        </div>
      </header>
        
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