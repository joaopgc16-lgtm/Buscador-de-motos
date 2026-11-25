import { useEffect, useRef } from 'react'
import { User, Settings, LogOut } from 'lucide-react'

const itemMenu =
  'flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#8a8fa8] transition-colors duration-150 hover:bg-[#1e2133] hover:text-[#f0f0f5] focus:outline-none focus-visible:bg-[#1e2133] focus-visible:text-[#f0f0f5] focus-visible:ring-2 focus-visible:ring-pink-600/50 sm:min-h-10'

function Avatar({ on, avatar, setAvatar, logout }) {
  const raizRef = useRef(null)
  const botaoRef = useRef(null)

  const nome = on?.usuario?.trim() || 'Usuário'
  const inicial = nome.charAt(0).toUpperCase()

  // Fecha o menu ao clicar fora ou apertar ESC
  useEffect(() => {
    if (!avatar) return

    function aoClicarFora(e) {
      if (raizRef.current && !raizRef.current.contains(e.target)) setAvatar(false)
    }
    function aoTeclar(e) {
      if (e.key === 'Escape') {
        setAvatar(false)
        botaoRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', aoClicarFora)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('pointerdown', aoClicarFora)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [avatar, setAvatar])

  function sair() {
    setAvatar(false)
    logout()
  }

  return (
    <div ref={raizRef} className="relative flex items-center">
      {/* Botão do avatar */}
      <button
        ref={botaoRef}
        type="button"
        onClick={() => setAvatar(!avatar)}
        aria-label="Abrir menu do usuário"
        aria-haspopup="menu"
        aria-expanded={avatar}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-pink-800 font-semibold text-white shadow-[0_0_18px_rgba(157,23,77,0.25)] transition-all duration-200 hover:bg-pink-700 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111527]
          ${avatar ? 'ring-2 ring-pink-600/40 ring-offset-2 ring-offset-[#111527]' : ''}`}
      >
        <span aria-hidden="true">{inicial}</span>

        {/* Bolinha de "online" */}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#111527] bg-emerald-500"
        />
      </button>

      {/* Menu */}
      <div
        role="menu"
        aria-label="Menu do usuário"
        className={`absolute right-0 top-[calc(100%+10px)] z-50 w-[min(16rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-xl border border-white/[0.07] bg-[#161927] shadow-[0_18px_60px_rgba(0,0,0,0.48)] transition-all duration-200 ease-out
          ${avatar
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible pointer-events-none -translate-y-2 scale-95 opacity-0'}`}
      >
        {/* Informações do usuário */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3.5">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-800 font-semibold text-white"
          >
            {inicial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#f0f0f5]">{nome}</p>
            <p className="mt-0.5 text-xs text-[#8a8fa8]">Minha conta</p>
          </div>
        </div>

        {/* Opções */}
        <div className="p-1.5">
          <button type="button" role="menuitem" className={itemMenu}>
            <User size={16} className="shrink-0" />
            Meu perfil
          </button>
          <button type="button" role="menuitem" className={itemMenu}>
            <Settings size={16} className="shrink-0" />
            Configurações
          </button>
        </div>

        {/* Sair */}
        <div className="border-t border-white/[0.07] p-1.5">
          <button
            type="button"
            role="menuitem"
            onClick={sair}
            className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-[#e53e3e] transition-colors duration-150 hover:bg-[#e53e3e]/10 focus:outline-none focus-visible:bg-[#e53e3e]/10 focus-visible:ring-2 focus-visible:ring-[#e53e3e]/50 sm:min-h-10"
          >
            <LogOut size={16} className="shrink-0" />
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  )
}

export default Avatar