import React from 'react'
import { Link } from 'react-router-dom'

const AuthLayout = ({children}) => {
    return (
        <div className=" flex flex-col items-center  h-screen bg-gray-200  ">
            <div className = "w-full ">
                <Link to='/'>
                    <i className='fas fa-home cursor-pointer hover:text-indigo-500 ' />
                </Link>
            </div>
            <main>
                {children}
            </main>
        </div>
        
        
    )
}

export default AuthLayout
