function Avatar({ on, avatar, setAvatar, logout }) {
  const inicial = on?.usuario?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative flex items-center">
      {/* Avatar */}
      <button
        type="button"
        onClick={() => setAvatar(!avatar)}
        className={`
          flex h-10 w-10 items-center justify-center
          rounded-full bg-pink-800
          font-semibold text-white
          shadow-[0_0_18px_rgba(157,23,77,0.25)]
          transition-all duration-200
          hover:bg-pink-700
          active:scale-95
          ${
            avatar
              ? "ring-2 ring-pink-600/40 ring-offset-2 ring-offset-[#0d0f1a]"
              : ""
          }
        `}
        aria-label="Abrir menu do usuário"
        aria-expanded={avatar}
      >
        <span>{inicial}</span>
      </button>

      {/* Menu do avatar */}
      <div
        className={`
          absolute right-0 top-[calc(100%+10px)] z-50
          w-64 origin-top-right
          overflow-hidden rounded-xl
          border border-white/[0.07]
          bg-[#161927]
          shadow-[0_18px_60px_rgba(0,0,0,0.48)]

          transition-all duration-200 ease-out

          ${
            avatar
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible pointer-events-none -translate-y-2 scale-95 opacity-0"
          }
        `}
      >
        {/* Informações do usuário */}
        <div className="border-b border-white/[0.07] px-4 py-3">
          <p className="text-sm font-semibold text-[#f0f0f5]">
            {on?.usuario || "Usuário"}
          </p>

          <p className="mt-0.5 text-xs text-[#8a8fa8]">
            Minha conta
          </p>
        </div>

        {/* Opções */}
        <div className="p-1.5">
          <button
            type="button"
            className="
              w-full rounded-lg px-3 py-2.5
              text-left text-sm text-[#8a8fa8]
              transition-all duration-600
              hover:bg-[#1e2133]
              hover:text-[#f0f0f5]
              hover:scale-101
            "
          >
            Meu perfil
          </button>

          <button
            type="button"
            className="
              w-full rounded-lg px-3 py-2.5
              text-left text-sm text-[#8a8fa8]
              transition-all duration-600
              hover:bg-[#1e2133]
              hover:text-[#f0f0f5]
              hover:scale-101
            "
          >
            Configurações
          </button>
        </div>

        {/* Sair */}
        <div className="border-t border-white/[0.07] p-1.5">
          <button
            type="button"
            className="
              w-full rounded-lg px-3 py-2.5
              text-left text-sm text-[#e53e3e]
              transition-all duration-600
              hover:bg-[#e53e3e]/10 hover:scale-101
            "
            onClick={() => logout()}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Avatar;