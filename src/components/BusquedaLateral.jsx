import React from 'react'
import { useSearch } from 'context/searchContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';

const BusquedaLateral = () => {
    const location = useLocation()
    const {setSearch} = useSearch()
    const [titulo, setTitulo] = useState("")
    useEffect(() => {
        if (document.getElementById("sacarTitle")){
            setTitulo(document.getElementById("sacarTitle").getAttribute("title"));

        }
    }, [setTitulo, location])

    return (
        <div className = "flex h-screen overflow-hidden" >
        <div className ="flex flex-col justify-center border-4 border-black">
                <h2 className= "text-4xl font-extrabold m-4"> {titulo} </h2>
                <div className = "flex w-full">
                    <input 
                    type="search" 
                    className="border rounded-md focus-within:border-indigo-400 outline-none w-full"
                    placeholder = "Buscar"
                    onChange = {(e)=> setSearch (e.target.value)}/>
                    <i className = "fas fa-search"/>
                </div>
        </div>
    </div>
    );
};

export default BusquedaLateral;
