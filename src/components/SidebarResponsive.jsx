import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SidebarResponsive = () => {
    const [mostrarNavegacion, setMostrarNavegacion] = useState(false)
    return (
        <div>
            <div className= "md:hidden" onClick ={()=> {setMostrarNavegacion(!mostrarNavegacion)}}>
                <i className={`fas fa-${mostrarNavegacion? "times":"bars"}`}></i>
            </div>
            {mostrarNavegacion && <ul className ="bg-gray-900">
                <ResponsiveRoute nombre="Beers"/>
                <ResponsiveRoute nombre="Sales" ruta ="/admin/cervezas"/>
                <ResponsiveRoute nombre="Employees" />
            </ul> }
        </div>
    )
}
const ResponsiveRoute = ({ruta, nombre}) => {
    return (
        <Link to= {ruta}>
            <li className="text-gray-200 border-b-2 p-1 mx-2" >
                {nombre}
            </li>
        </Link>
    );
};
export default SidebarResponsive
