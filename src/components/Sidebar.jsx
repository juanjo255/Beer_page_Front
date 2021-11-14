import useActiveRoutes from 'hooks/useActiveRoutes';
import React from 'react'
import { Link } from 'react-router-dom'
import ImageLogo from './ImageLogo'
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
    const { user, logout } = useAuth0();
    const cerrarSesion = () =>{
        logout({ returnTo: window.location.origin });
        localStorage.setItem ("token", null);
    }
    return (
            <nav className = "hidden md:flex md:w-72 flex-col bg-gray-700 p-4 h-full border border-black"  >
                <ImageLogo/>
                <div className='my-4'>
                    <Ruta icono='fas fa-user' ruta='/admin/perfil' nombre='Profile' usuario = {user} />
                    <Ruta icono='fas fa-beer' ruta='/admin/missing' nombre='Beer' />
                    <Ruta icono='fas fa-cash-register' ruta='/admin/cervezas' nombre='Sales' />
                    <Ruta icono='fas fa-users' ruta='/admin/empleados' nombre='Employees' />
                    <button onClick={() => cerrarSesion()} className="p-1 my-60 text-white flex flex-col w-full items-center bg-red-400 rounded-md">
                        Log Out
                    </button>
                </div>
            </nav>
    );
};

const Ruta = ({ icono, ruta, nombre, usuario }) => {

    const active = useActiveRoutes (ruta);
    
    return (
        <Link to={ruta}>
        <button
        className={`p-2 my-2  bg-${active ? 'gray':'indigo'}-700 hover:bg-${active? 'gray-700':'indigo-900'} flex w-full items-center text-white rounded-md`}>
        {usuario ? (
            <>
                <img src={usuario.picture} className='w-5 rounded-full' alt ="imagen de perfil" />
                {usuario.name}
            </>) : (
            <>
                <i className={`${icono} w-10`} />
                {nombre}
            </>
        )}
        </button>
        </Link>
    );
};

export default Sidebar
