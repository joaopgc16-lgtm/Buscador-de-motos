function Busca({setBusca, buscarMoto, busca, nome, setNome, marca, setMarca, imagem, setImagem}){
    return(
         <div>

        <h1 className="text-4xl font-bold text-center text-white mb-1 tracking-tight">
          🏍️ Busca de <span className="text-red-500">Motos</span>
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Pesquise por nome e ano (ex: yzf_r6_2006)
        </p>

        <div className="flex gap-2 mb-8">
          
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarMoto()}
            placeholder="Digite o modelo e ano..."
            className="flex-1 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
          />
          <button
            onClick={buscarMoto}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Buscar
          </button>
        </div>
    </div>
    )
}export default Busca