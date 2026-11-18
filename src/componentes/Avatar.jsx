function Avatar({on}){
    return(
    <div className="flex align-center items-center">
    <button className=' bg-pink-800  opacity-70 w-10 h-10 font-extrabold rounded-full text-white'><span className="font-thin">{on.usuario.trim().toUpperCase()[0]}</span></button>
    </div>
)

}
export default Avatar