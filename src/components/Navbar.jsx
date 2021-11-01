import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-black">
                <ul className="flex w-full  justify-around items-center my-3 text-white text-lg ">
                    <li>Inicio</li>
                    <li>Nevera</li>
                    <li>FQ</li>
                    <li className="px-3">
                        <Link to="/login">
                        <button className= "bg-yellow-300 p-2 rounded-lg hover:bg-indigo-300 text-black">Sign in</button>
                        </Link>
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar
