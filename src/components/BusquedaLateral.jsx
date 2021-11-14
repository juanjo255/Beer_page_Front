import React from 'react'

const BusquedaLateral = ({setBusqueda}) => {
    return (
        <div className = "flex h-screen overflow-hidden" >
        <div className ="flex flex-col justify-center border-4 border-black">
                <h2 className= "text-4xl font-extrabold m-4"> VENTAS REALIZADAS </h2>
                <div className = "flex w-full">
                    <input 
                    type="search" 
                    className="border rounded-md focus-within:border-indigo-400 outline-none w-full"
                    placeholder = "Buscar"
                    onChange = {(e)=> setBusqueda (e.target.value)}/>
                    <i className = "fas fa-search"/>
                </div>
        </div>
    </div>
    );
};

export default BusquedaLateral;
