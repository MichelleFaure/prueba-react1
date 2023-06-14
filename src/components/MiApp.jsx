import React, { useEffect, useState } from 'react'
import "./MiApp.css"

function MiApp() {
    const [gifs, setGifs] = useState([])
    const [input, setInput] = useState('')
    const [select, setSelect] = useState('')
    const [sorted, setSorted] = useState(false)

  const consultaAPI = async () => {
    const url = 'https://api.giphy.com/v1/gifs/trending?api_key=fWesRD6e6qzNtrNnO9H8pegtcfohZzCg&limit=25&rating=g'
    const resultado = await fetch(url);
    const datos = await resultado.json()
    setGifs(datos.data)
}  

const search = async () => {
    const url =  `https://api.giphy.com/v1/gifs/search?api_key=fWesRD6e6qzNtrNnO9H8pegtcfohZzCg&q=${input}&limit=25&offset=0&rating=g&lang=es`
    const resultado = await fetch(url);
    const datos = await resultado.json()
    setGifs(datos.data)
} 

const ordenar = () => {
    let sort
    if(select == "A"){
        sort = gifs.sort((x, y) => x.username.localeCompare(y.username))
    }
    else{
        sort =  gifs.sort((x, y) => y.username.localeCompare(x.username))
        
    }
    setGifs(sort)  
    setSorted(!sorted)
} 

useEffect(()=>{
    consultaAPI();
},[])

  return (
    <div>
        <div className='barrabusqueda'>
            <input type='text' placeholder='Busca gif' onChange={(e)=>{setInput(e.target.value)}} />
            <button onClick={()=> search()}>
                <i class="fa-solid fa-magnifying-glass searchicon"></i>
            </button>
        </div>

        <div className='barraOrden'>
             <select onChange={(e)=>{setSelect(e.target.value)}} defaultValue="ordenar de" >
                <option value="ordenar de">ordenar usuario de</option>
                <option value="A">A - Z</option>
                <option value="Z">Z - A</option>
             </select>
             <button className='btnOrden' onClick={()=> ordenar()}>Ordenar</button>
        </div>

        <div className='cardsContainer'> 
            {
                gifs.filter(elemento => elemento.username !== "").map((gif,i)=>{
                    return(
                        <div key={i} className='gif'>
                            <img className='gifimg' src={gif.images.original.url} alt="" />
                            <div className='gifinfo'>
                                <img className='avatarPhoto' src={gif.user.avatar_url} alt="" />
                                <p className='userName'>{gif.username}</p>
                                <div>
                                    <a href={gif.url} target='_blank'><i class="fa-regular fa-eye"></i></a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MiApp

