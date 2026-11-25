import { API } from './api'

import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Search, SearchX } from 'lucide-react'
import Busca from './componentes/Busca'
import MotosResults from './componentes/MotosResults'
import ModalLogin from './componentes/ModalLogin'
import ModalAviso from './componentes/ModalAviso'
import Avatar from './componentes/Avatar'

function EsqueletoCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161927]">
      <div className="aspect-[4/3] bg-[#1e2133]" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 rounded bg-[#1e2133]" />
        <div className="h-4 w-full rounded bg-[#1e2133]" />
      </div>
    </div>
  )
}

function EstadoVazio({ buscou }) {
  const Icone = buscou ? SearchX : Search
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1e2133] text-gray-500">
        <Icone size={26} />
      </div>
      <p className="text-gray-400">
        {buscou ? 'Nenhuma moto encontrada.' : 'Nenhum resultado ainda.'}
      </p>
      <p className="max-w-xs text-sm text-gray-500">
        {buscou
          ? 'Tente outro nome ou confira o ano digitado.'
          : 'Digite o modelo e o ano acima para começar.'}
      </p>
    </div>
  )
}

function App() {

  const { busca, setBusca, motos, setMotos, on, setOn } = useOutletContext()
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [entrar, setEntrar] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [cadastrar, setCadastrar] = useState(false)
  const [email, setEmail] = useState('')
  const [cadastrado, setCadastrado] = useState(null)
  const [logado, setLogado] = useState(null)
  const [avatar, setAvatar] = useState(false)
  const [mensagem, setMensagem] = useState(null)
  const [mostrarlogin, setMostrarlogin] = useState(false)
  const [mostrarcadastro, setMostrarcadastro] = useState(false)

  // novos: separam o estado da busca do estado do login
  const [buscando, setBuscando] = useState(false)
  const [buscou, setBuscou] = useState(false)
  const [erroLogin, setErroLogin] = useState(null)

  // trava o scroll da página enquanto o modal de login está aberto
  useEffect(() => {
    document.body.style.overflow = entrar ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [entrar])

  function conferircadastro(cadastro) {
    if (cadastro === true) {
      return (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-2xl text-green-400">
          ✓
        </div>
      )
    } else {
      return (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-2xl text-red-400">
          ✕
        </div>
      )
    }
  }

  function conferirlogin(logado) {
    if (logado === true) {
      return (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-2xl text-green-400">
          ✓
        </div>
      )
    } else {
      return (
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-2xl text-red-400">
          ✕
        </div>
      )
    }
  }

  async function cadastro() {
    setErroLogin(null)
    setCarregando(true)
    try {
      const resposta = await fetch(`${API}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha, email }),
        credentials: 'include',
      })
      const dados = await resposta.json().catch(() => ({}))
      if (!resposta.ok) throw new Error(dados.mensagem_de_erro || 'Falha ao criar conta.')

      setMensagem(dados.mensagem)
      setCadastrado(true)
      setMostrarcadastro(true)
      setOn(dados.usuario)
      setEntrar(false)
    } catch (e) {
      setMensagem(e.message)
      setCadastrado(false)
      setMostrarcadastro(true)
      setEntrar(false)
    } finally {
      setCarregando(false)
    }
  }

  async function login() {
    setErroLogin(null)
    setCarregando(true)
    try {
      const resposta = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
        credentials: 'include',
      })
      const dados = await resposta.json().catch(() => ({}))
      if (!resposta.ok) throw new Error(dados.mensagem_de_erro || 'Falha ao realizar login.')

      setMensagem(dados.mensagem)
      setLogado(true)
      setMostrarlogin(true)
      setOn(dados.usuario)
      setEntrar(false)
    } catch (e) {
      setMensagem(e.message)
      setLogado(false)
      setMostrarlogin(true)
      setEntrar(false)
    } finally {
      setCarregando(false)
    }
  }

  async function logout() {
    setErro(null)
    try {
      const resposta = await fetch(`${API}/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      const dados = await resposta.json().catch(() => ({}))
      setOn(null)
      console.log(dados.mensagem)
    } catch (e) {
      setErro(e.message)
    }
  }

  async function buscarMoto() {
    setErro(null)
    setBuscando(true)
    setBuscou(true)
    setMotos([])
    try {
      const moto = await fetch(`${API}?motosearch=${encodeURIComponent(busca)}`)
      if (!moto.ok) throw new Error('Query parameters execution failed.')
      const results = await moto.json()
      setMotos(results.resultado)
      console.log(results.listas)
    } catch {
      setErro('[ERRO] Falha ao carregar resultados da busca')
    } finally {
      setBuscando(false)
    }
  }

  return (
    <div className="min-h-dvh bg-linear-to-b from-[#111127] to-[#111527]">

      <ModalLogin
        entrar={entrar} setEntrar={setEntrar}
        login={login} cadastro={cadastro}
        cadastrar={cadastrar} setCadastrar={setCadastrar}
        usuario={usuario} setUsuario={setUsuario}
        email={email} setEmail={setEmail}
        senha={senha} setSenha={setSenha}
        erro={erroLogin} carregando={carregando}
      />

      {mostrarcadastro && !mostrarlogin && (
        <ModalAviso
          titulo={cadastrado ? 'Conta criada!' : 'Erro ao criar conta.'}
          conferiricone={conferircadastro}
          cadastrado={cadastrado}
          mensagem={mensagem}
          aoFechar={() => setMostrarcadastro(null)}
        />
      )}

      {!mostrarcadastro && mostrarlogin && (
        <ModalAviso
          titulo={logado ? 'Sucesso' : 'Erro'}
          conferiricone={conferirlogin}
          logado={logado}
          mensagem={mensagem}
          aoFechar={() => setMostrarlogin(null)}
        />
      )}

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#111527]/80 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
            <span aria-hidden="true">🏍️ </span>
            <span className="text-red-500">Motos</span>
          </span>

          {on ? (
            <Avatar on={on} avatar={avatar} setAvatar={setAvatar} logout={logout} />
          ) : (
            <button
              type="button"
              onClick={() => setEntrar(true)}
              className="h-10 rounded-xl border border-red-600 px-5 text-sm font-semibold text-red-500 transition-all hover:bg-red-600 hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Entrar
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-6 sm:pt-10">

        {/* Busca estreita e centralizada; os resultados usam a largura toda */}
        <div className="mx-auto max-w-2xl">
          <Busca busca={busca} setBusca={setBusca} buscarMoto={buscarMoto} />

          {erro && (
            <p role="alert" className="mb-6 rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-center text-sm text-red-400 sm:text-base">
              {erro}
            </p>
          )}
        </div>

        {buscando && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2" aria-busy="true">
            {Array.from({ length: 2}).map((_, i) => <EsqueletoCard key={i} />)}
          </div>
        )}

        {!buscando && !erro && motos.length === 0 && <EstadoVazio buscou={buscou} />}

        {!buscando && motos.length > 0 && (
          <>
            <p aria-live="polite" className="mb-4 text-sm text-gray-400">
              {motos.length} {motos.length === 1 ? 'moto encontrada' : 'motos encontradas'}
            </p>
            <MotosResults motos={motos} />
          </>
        )}
      </main>
    </div>
  )
}

export default App