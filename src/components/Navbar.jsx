import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <nav className="bg-black">
                <ul className="flex w-full  justify-around items-center my-3 text-white text-lg ">
                    <li>Inicio</li>
                    <li>Nevera</li>
                    <li>FQ</li>
                    <li className="px-3">
                        {isAuthenticated ? 
                            (<Link to="/admin/prueba"> <button 
                            className= "bg-yellow-300 p-2  px-5 rounded-lg hover:bg-indigo-300 text-black"> 
                                <i class="fas fa-home"/> Home
                                </button></Link>) : (<button onClick={() => loginWithRedirect()} 
                            className= "bg-yellow-300 p-2  rounded-lg hover:bg-indigo-300 text-black">
                                Sign in </button>)
                            }
                    </li>
                </ul>
        </nav>
    )
                        };

export default Navbar
