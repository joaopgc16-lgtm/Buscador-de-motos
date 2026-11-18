import { Bike, X, UserRound, Mail, LockKeyhole, Eye } from "lucide-react"

function ModalLogin({login, cadastro, cadastrar, setCadastrar, setUsuario, setEmail, setSenha}){
    return(
        
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      {/* Modal */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161927] shadow-[0_28px_90px_rgba(0,0,0,0.58)]">
        {/* Cabeçalho */}
        <div className="relative border-b border-white/[0.07] px-6 pb-5 pt-6">
          <button
            type="button"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#8a8fa8] transition-colors hover:bg-[#1e2133] hover:text-white"
            aria-label="Fechar modal"
          >
            <X size={17} />
          </button>

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e53e3e]/20 bg-[#e53e3e]/10 text-[#e53e3e]">
            <Bike size={19} />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-[#f0f0f5]">
            Acesse sua conta
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-[#8a8fa8]">
            Entre ou crie uma conta para salvar suas motos favoritas.
          </p>
        </div>

        {/* Seletor entrar/cadastrar */}
        <div className="px-6 pt-6">
          <div className="grid grid-cols-2 rounded-xl border border-white/[0.07] bg-[#1e2133] p-1">
            {/* Aba ativa */}
            <button
              type="button"
              className={`rounded-lg ${!cadastrar ? "bg-[#e53e3e]" : null } ${cadastrar ? "hover:bg-white/[0.04]" : null} hover:text-[#f0f0f5] px-4 py-2.5 text-sm font-semibold ${!cadastrar ? "text-white" : "text-[#8a8fa8]"} ${!cadastrar ? "shadow-[0_5px_18px_rgba(229,62,62,0.25)]" : null} transition-all`}
              onClick={() => setCadastrar(false)}
            >
              Entrar
            </button>

            {/* Aba inativa */}
            <button
              type="button"
              className={`rounded-lg px-4 py-2.5 text-sm font-medium ${!cadastrar ? "text-[#8a8fa8]" : "text-[#f0f0f5]"} transition-colors ${!cadastrar ? "hover:bg-white/[0.04]": null} ${cadastrar ? "hover:text-[#f0f0f5]" : null} ${cadastrar ? "bg-[#e53e3e]" : null}`} onClick={() => setCadastrar(true)}
            >
              Criar conta
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form className="space-y-4 px-6 py-6">
          {/* Campo nome — utilize apenas no cadastro */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8a8fa8]">
              Nome
            </label>

            <div className="relative">
              <UserRound
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa8]"
              />

              <input
                type="text"
                placeholder="Como podemos chamar você?"
                className="w-full rounded-xl border border-white/[0.07] bg-[#1e2133] py-3 pl-10 pr-4 text-sm text-[#f0f0f5] outline-none transition-all placeholder:text-[#8a8fa8]/70 hover:border-white/[0.12] focus:border-[#e53e3e]/60 focus:ring-2 focus:ring-[#e53e3e]/10"
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
          </div>
        {cadastrar && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#8a8fa8]">
              E-mail
            </label>

            <div className="relative">
              <Mail
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa8]"
              />

              <input
                type="email"
                placeholder="voce@email.com"
                className="w-full rounded-xl border border-white/[0.07] bg-[#1e2133] py-3 pl-10 pr-4 text-sm text-[#f0f0f5] outline-none transition-all placeholder:text-[#8a8fa8]/70 hover:border-white/[0.12] focus:border-[#e53e3e]/60 focus:ring-2 focus:ring-[#e53e3e]/10"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}
          {/* Campo senha */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-[#8a8fa8]">
                Senha
              </label>

              <button
                type="button"
                className="text-[11px] font-medium text-[#e53e3e] transition-colors hover:text-[#ef4b4b] hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            <div className="relative">
              <LockKeyhole
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a8fa8]"
              />

              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full rounded-xl border border-white/[0.07] bg-[#1e2133] py-3 pl-10 pr-11 text-sm text-[#f0f0f5] outline-none transition-all placeholder:text-[#8a8fa8]/70 hover:border-white/[0.12] focus:border-[#e53e3e]/60 focus:ring-2 focus:ring-[#e53e3e]/10"
                onChange={(e) => setSenha(e.target.value)}
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-[#8a8fa8] transition-colors hover:bg-white/[0.05] hover:text-white"
                aria-label="Mostrar senha"
              >
                <Eye size={15} />
              </button>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-5 py-3 text-sm font-medium text-[#f0f0f5] transition-all hover:border-white/[0.12] hover:bg-white/[0.08] active:scale-[0.98]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#e53e3e] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(229,62,62,0.22)] transition-all hover:bg-[#ef4b4b] hover:shadow-[0_12px_35px_rgba(229,62,62,0.3)] active:scale-[0.98]"
              onClick={cadastrar ? () => cadastro() : () => login()}
            >
              Confirmar
            </button>
          </div>
        </form>

        {/* Rodapé */}
        <div className="border-t border-white/[0.07] bg-[#1e2133]/30 px-6 py-4 text-center text-xs text-[#8a8fa8]">
          Ao continuar, você concorda com os{" "}
          <a
            href="#"
            className="font-medium text-[#f0f0f5] transition-colors hover:text-[#e53e3e]"
          >
            Termos de Uso
          </a>{" "}
          e a{" "}
          <a
            href="#"
            className="font-medium text-[#f0f0f5] transition-colors hover:text-[#e53e3e]"
          >
            Política de Privacidade
          </a>
          .
        </div>
      </div>
    </div>
    )
} export default ModalLogin