import { useState } from 'react'
import { X, Bike, UserRound, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-react'

const campo =
  'w-full rounded-xl border border-white/[0.07] bg-[#1e2133] py-3 pl-10 text-base sm:text-sm text-[#f0f0f5] outline-none transition-all placeholder:text-[#8a8fa8]/70 hover:border-white/[0.12] focus:border-[#e53e3e]/60 focus:ring-2 focus:ring-[#e53e3e]/10'

const abaBase = 'rounded-lg px-4 py-2.5 text-sm transition-all'
const abaAtiva = 'bg-[#e53e3e] font-semibold text-white shadow-[0_5px_18px_rgba(229,62,62,0.25)]'
const abaInativa = 'font-medium text-[#8a8fa8] hover:bg-white/[0.04] hover:text-[#f0f0f5]'

function ModalLogin({
  entrar, setEntrar, login, cadastro, cadastrar, setCadastrar,
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
  onClick={() => setEntrar(false)}
  aria-hidden={!entrar}
  className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm
    transition-[opacity,visibility] duration-300
    ${entrar ? 'visible opacity-100' : 'invisible opacity-0'}`}
>
  <div
  role="dialog"
  aria-modal="true"
  aria-labelledby="titulo-login"
  onClick={(e) => e.stopPropagation()}
  className={`max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overflow-x-hidden overscroll-contain rounded-2xl border border-white/[0.07] bg-[#161927]
    shadow-[0_28px_90px_rgba(0,0,0,0.58)] transition-all duration-300
    ${entrar ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'}`}
>

    {/* Cabeçalho */}
    <div className="relative border-b border-white/[0.07] px-6 pb-5 pt-6">
      {/* ... resto igual */}
          <button
            type="button"
            aria-label="Fechar modal"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg text-[#8a8fa8] transition-colors hover:bg-[#1e2133] hover:text-white sm:right-4 sm:top-4 sm:h-8 sm:w-8"
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
               className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[#8a8fa8] transition-colors hover:bg-white/[0.05] hover:text-white"
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
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end">
  <button type="button" onClick={() => setEntrar(false)}
    className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-5 py-3 text-sm font-medium text-[#f0f0f5] transition-all hover:border-white/[0.12] hover:bg-white/[0.08] active:scale-[0.98] sm:w-auto">
    Cancelar
  </button>
  <button type="submit" disabled={carregando}
    className="w-full rounded-xl bg-[#e53e3e] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(229,62,62,0.22)] transition-all hover:bg-[#ef4b4b] hover:shadow-[0_12px_35px_rgba(229,62,62,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
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