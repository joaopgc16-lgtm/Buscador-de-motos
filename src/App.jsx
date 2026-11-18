import { API } from './api'

import { useState,} from 'react'
import { useOutletContext } from 'react-router-dom'
import Busca from './componentes/Busca'
import MotosResults from './componentes/MotosResults'
import ModalLogin from './componentes/ModalLogin'
import ModalAviso from './componentes/ModalAviso'

function App() {
 const {busca, setBusca, motos, setMotos} = useOutletContext()
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [entrar, setEntrar] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastrar, setCadastrar] = useState(false);
  const [email, setEmail] = useState('');
  const [cadastroSucesso, setCadastroSucesso] = useState(null)
  const [logado, setLogado] = useState(null)
  
  async function cadastro() {
  setErro(null)
  setCarregando(true)
  try {
    const resposta = await fetch(`${API}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha, email }),
      credentials: "include"
    })
    const dados = await resposta.json().catch(() => ({}))
    if (!resposta.ok) throw new Error(dados.mensagem_de_erro || 'Falha ao cadastrar usuário.')
    setCadastroSucesso(dados.mensagem_de_erro || dados.mensagem)
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
      body: JSON.stringify({ usuario, senha }),
      credentials: "include"
    })
    const dados = await resposta.json().catch(() => ({}))
    if (!resposta.ok) throw new Error(dados.mensagem_de_erro || 'Falha ao realizar login.')
    setLogado( dados.mensagem_de_erro || dados.mensagem)
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

    <div className="min-h-screen max-w-screen bg-linear-to-b from-gray-950 to-gray-900">

     {entrar && (
      <ModalLogin login={login} cadastro={cadastro} cadastrar={cadastrar} setCadastrar={setCadastrar} usuario={usuario} setUsuario={setUsuario} email={email} setEmail={setEmail} senha={setSenha} setSenha={setSenha}/>
      )}
      {cadastroSucesso && !logado &&(
           <ModalAviso
    titulo="Conta criada!"
    mensagem={cadastroSucesso}
    aoFechar={() => setCadastroSucesso(null)}
  />
      )}
    {!cadastroSucesso && logado &&(
        <ModalAviso
    titulo="Bem-vindo!"
    mensagem={logado}
    aoFechar={() => setLogado(null)}
  />
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