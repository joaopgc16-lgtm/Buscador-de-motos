import { useState, useEffect, useRef, useCallback, useId } from 'react'
import { X } from 'lucide-react'

function ModalAviso({ titulo, aoFechar, logado, mensagem, conferiricone, cadastrado }) {
  const [visivel, setVisivel] = useState(false)
  const botaoRef = useRef(null)
  const timerRef = useRef(null)
  const idTitulo = useId()
  const idMensagem = useId()

  const sucesso = Boolean(logado || cadastrado)

  // Entrada: espera 2 frames para o navegador pintar o estado inicial e animar até o final
  useEffect(() => {
    let r2
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setVisivel(true)
        botaoRef.current?.focus()
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  // Saída: toca a animação de saída e só depois avisa o pai para desmontar
  const fechar = useCallback(() => {
    if (timerRef.current) return
    setVisivel(false)
    timerRef.current = setTimeout(aoFechar, 250)
  }, [aoFechar])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  // ESC fecha + trava o scroll da página por trás
  useEffect(() => {
    const aoTeclar = (e) => { if (e.key === 'Escape') fechar() }
    window.addEventListener('keydown', aoTeclar)
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = anterior
    }
  }, [fechar])

  return (
    <div
      onClick={fechar}
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm transition-opacity duration-300 sm:items-center sm:p-4
        ${visivel ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        aria-describedby={idMensagem}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full overflow-hidden rounded-t-3xl border border-white/[0.07] bg-[#161927]
          px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 text-center
          shadow-[0_28px_90px_rgba(0,0,0,0.58)] transition-all duration-300
          sm:max-w-sm sm:rounded-2xl sm:px-8 sm:pb-8
          ${visivel
            ? 'translate-y-0 opacity-100 sm:scale-100'
            : 'translate-y-8 opacity-0 sm:translate-y-4 sm:scale-95'}`}
      >
        {/* Barra de cor no topo: verde = sucesso, vermelho = erro */}
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r to-transparent
            ${sucesso ? 'from-emerald-500 via-emerald-400' : 'from-red-600 via-red-500'}`}
        />

        {/* Alça visual de bottom sheet (só no celular) */}
        <div className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-white/15 sm:hidden" />

        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-[#8a8fa8] transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:h-9 sm:w-9"
        >
          <X size={18} />
        </button>

        {/* Ícone com brilho atrás */}
        <div className="relative mx-auto w-fit">
          <div
            aria-hidden="true"
            className={`absolute inset-0 -z-0 scale-150 rounded-full blur-2xl
              ${sucesso ? 'bg-emerald-500/25' : 'bg-red-500/25'}`}
          />
          <div className="relative">{conferiricone(sucesso)}</div>
        </div>

        <h2 id={idTitulo} className="mb-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
          {titulo}
        </h2>
        <p id={idMensagem} className="mx-auto mb-6 max-w-xs break-words text-sm leading-relaxed text-gray-400 sm:text-base">
          {mensagem}
        </p>

        <button
          ref={botaoRef}
          type="button"
          onClick={fechar}
          className="h-12 w-full rounded-xl bg-red-600 font-semibold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#161927]"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default ModalAviso