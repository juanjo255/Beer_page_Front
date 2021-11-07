import useActiveRoutes from 'hooks/useActiveRoutes';
import React from 'react'
import { Link } from 'react-router-dom'
import ImageLogo from './ImageLogo'
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
    const { logout } = useAuth0();
    return (
            <nav className = "hidden md:flex md:w-72 flex-col bg-gray-700 p-4 h-full border border-black"  >
                <ImageLogo/>
                <div className='my-4'>
                    <Ruta icono='fas fa-user' ruta='/admin/perfil' nombre='Profile' />
                    <Ruta icono='fas fa-beer' ruta='/admin/missing' nombre='Beer' />
                    <Ruta icono='fas fa-cash-register' ruta='/admin/cervezas' nombre='Sales' />
                    <Ruta icono='fas fa-users' ruta='/admin/empleados' nombre='Employees' />
                    <button onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                    </button>
                </div>
            </nav>
    );
};

const Ruta = ({ icono, ruta, nombre }) => {

    const active = useActiveRoutes (ruta);
    
    return (
        <Link to={ruta}>
        <button
        className={`p-1 my-2  bg-${active ? 'gray':'indigo'}-700 hover:bg-${active? 'gray-700':'indigo-900'} flex w-full items-center text-white rounded-md`}>
        <i className={`${icono} w-10`} />
                {nombre}
            <i/>
        </button>
        </Link>
    );
};

export default Sidebar
