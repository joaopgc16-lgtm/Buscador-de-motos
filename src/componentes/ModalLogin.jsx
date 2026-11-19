import { useState } from 'react'
import { X, Bike, UserRound, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react'

const campo =
  'w-full rounded-xl border border-white/[0.07] bg-[#1e2133] py-3 pl-10 text-sm text-[#f0f0f5] outline-none transition-all placeholder:text-[#8a8fa8]/70 hover:border-white/[0.12] focus:border-[#e53e3e]/60 focus:ring-2 focus:ring-[#e53e3e]/10'

const abaBase = 'rounded-lg px-4 py-2.5 text-sm transition-all'
const abaAtiva = 'bg-[#e53e3e] font-semibold text-white shadow-[0_5px_18px_rgba(229,62,62,0.25)]'
const abaInativa = 'font-medium text-[#8a8fa8] hover:bg-white/[0.04] hover:text-[#f0f0f5]'

function ModalLogin({
  setEntrar, login, cadastro, cadastrar, setCadastrar,
  usuario, setUsuario, email, setEmail, senha, setSenha,
  erro, carregando,
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false)

  function enviar(e) {
    e.preventDefault()
    if (cadastrar) cadastro()
    else login()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
       
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161927] shadow-[0_28px_90px_rgba(0,0,0,0.58)]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cabeçalho */}
        <div className="relative border-b border-white/[0.07] px-6 pb-5 pt-6">
          <button
            type="button"
            aria-label="Fechar modal"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#8a8fa8] transition-colors hover:bg-[#1e2133] hover:text-white"
            onClick={() => setEntrar(false)}
          >
            <X size={17} />
          </button>

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e53e3e]/20 bg-[#e53e3e]/10 text-[#e53e3e]">
            <Bike size={19} />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[#f0f0f5]">Acesse sua conta</h2>
          <p className="mt-1 text-sm leading-relaxed text-[#8a8fa8]">
            Entre ou crie uma conta para salvar suas motos favoritas.
          </p>
        </div>

        {/* Abas */}
        <div className="px-6 pt-6">
          <div className="grid grid-cols-2 rounded-xl border border-white/[0.07] bg-[#1e2133] p-1">
            <button
              type="button"
              aria-pressed={!cadastrar}
              className={`${abaBase} ${!cadastrar ? abaAtiva : abaInativa}`}
              onClick={() => setCadastrar(false)}
            >
              Entrar
            </button>
            <button
              type="button"
              aria-pressed={cadastrar}
              className={`${abaBase} ${cadastrar ? abaAtiva : abaInativa}`}
              onClick={() => setCadastrar(true)}
            >
              Criar conta
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={enviar} className="space-y-4 px-6 py-6">
          {/* Usuário (entrar e criar conta) */}
          <div>
            <label htmlFor="campo-usuario" className="mb-1.5 block text-xs font-medium text-[#8a8fa8]">
              Usuário
            </label>
            <div className="relative">
              <UserRound size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa8]" />
              <input
                id="campo-usuario"
                type="text"
                required
                autoComplete="username"
                placeholder="Seu nome de usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className={`${campo} pr-4`}
              />
            </div>
          </div>

          {/* E-mail (só criar conta) */}
          {cadastrar && (
            <div>
              <label htmlFor="campo-email" className="mb-1.5 block text-xs font-medium text-[#8a8fa8]">
                E-mail
              </label>
              <div className="relative">
                <Mail size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa8]" />
                <input
                  id="campo-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${campo} pr-4`}
                />
              </div>
            </div>
          )}

          {/* Senha */}
          <div>
            <label htmlFor="campo-senha" className="mb-1.5 block text-xs font-medium text-[#8a8fa8]">
              Senha
            </label>
            <div className="relative">
              <LockKeyhole size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa8]" />
              <input
                id="campo-senha"
                type={mostrarSenha ? 'text' : 'password'}
                required
                minLength={cadastrar ? 8 : undefined}
                autoComplete={cadastrar ? 'new-password' : 'current-password'}
                placeholder={cadastrar ? 'Mínimo de 8 caracteres' : 'Digite sua senha'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={`${campo} pr-11`}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((atual) => !atual)}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-[#8a8fa8] transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {mostrarSenha ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Erro */}
          {erro && (
            <p role="alert" className="rounded-xl border border-[#e53e3e]/20 bg-[#e53e3e]/10 px-4 py-3 text-sm text-[#ef4b4b]">
              {erro}
            </p>
          )}

          {/* Botões */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEntrar(false)}
              className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-5 py-3 text-sm font-medium text-[#f0f0f5] transition-all hover:border-white/[0.12] hover:bg-white/[0.08] active:scale-[0.98]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={carregando}
              className="rounded-xl bg-[#e53e3e] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(229,62,62,0.22)] transition-all hover:bg-[#ef4b4b] hover:shadow-[0_12px_35px_rgba(229,62,62,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {carregando ? 'Aguarde...' : 'Confirmar'}
            </button>
          </div>
        </form>

        {/* Rodapé */}
        <div className="border-t border-white/[0.07] bg-[#1e2133]/30 px-6 py-4 text-center text-xs text-[#8a8fa8]">
          Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.
        </div>
      </div>
    </div>
  )
}

export default ModalLogin