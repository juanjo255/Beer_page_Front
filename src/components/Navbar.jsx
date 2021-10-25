import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-black">
                <ul className="flex w-full justify-between my-3 text-white ">
                    <li>navegacion 1</li>
                    <li>navegacion 2</li>
                    <li>navegacion 3</li>
                    <li>navegacion 4</li>
                    <li className="px-3">
                        <Link to="/login">
                        <button className= "bg-yellow-300 p-2 rounded-lg hover:bg-indigo-300 ">Sign in</button>
                        </Link>
                    </li>
                </ul>
        </nav>
    )
}

export default Navbar
