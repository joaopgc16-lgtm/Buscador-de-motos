function Avatar({on}){
    return(
    <div>
    <button className='rounded-full bg-pink-800 w-10 h-10 font-extrabold'>{on.usuario.trim()[0]}</button>
    </div>
)

}
export default Avatar