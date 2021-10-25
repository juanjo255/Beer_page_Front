import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "media/cerveceria.ico"

const Login = () => {
    return (
        <div>
            <img className= "m-5 pb-3 pl-8 " src={Logo} alt="logo" />
            <h2 className=" text-center text-2xl font-extrabold ">Sign in</h2> 
            <form className= " mt-5 max-w-screen-sm">
                <div>
                    <input className="appearance-none px-3 py-2 relative block w-full rounded-md border border-gray-300  focus:border-yellow-500 focus:outline-none "
                    type='email' placeholder="example@example.com" 
                    required />
                    <input className="appearance-none px-3 py-2 relative block w-full rounded-md border border-gray-300  focus:border-yellow-500 focus:outline-none " 
                    type="password" 
                    required />
                </div>
                <div className="flex flex-row justify-between" >
                    <label htmlFor="recuerdame"> 
                        <input type="checkbox" name= "recuerdame"/> 
                        Remind me
                    </label>
                    <div className=" hover:text-indigo-600 " >
                        <Link to="/">
                            forgot your password?
                        </Link>
                    </div>
                </div>
                <div className= " flex justify-center" >
                    <Link to="/admin">
                        <button className="border bg-white py-1 px-5 rounded-md" type="submit"> Go </button>
                    </Link>
                </div>
                <div className = "font-extrabold ">
                    ------------------------- or --------------------------
                </div>
                <div className="flex justify-center">
                    <Link>
                        <button className= " p-2 border bg-white rounded-md">Go with google</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login
