import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <nav className="bg-black">
                <ul className="flex w-full  justify-around items-center my-3 text-white text-lg ">
                    <li className=' p-2  rounded-lg hover:bg-yellow-500 text-white hover:text-black font-semibold'>Fridge</li>
                    <li className=' p-2  rounded-lg hover:bg-yellow-500 text-white hover:text-black font-semibold'>Q&A</li>
                    <li className="px-3">
                        {isAuthenticated ? 
                            (<Link to="/admin/ventas"> <button 
                            className= " p-2  px-5 rounded-lg hover:bg-yellow-500 text-white hover:text-black"> 
                                <i className="fas fa-door"/> Gate
                                </button></Link>) : (<button onClick={() => loginWithRedirect()} 
                            className= " p-2  rounded-lg hover:bg-yellow-500 text-white hover:text-black font-semibold">
                                Log in </button>)
                            }
                    </li>
                </ul>
        </nav>
    )
                        };

export default Navbar
