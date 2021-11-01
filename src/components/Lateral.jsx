import React from 'react'

const Lateral = ({children}) => {
    return (
        <div className="border-4 flex ">
            <h2 className= "text-4xl font-extrabold m-4 h-screen "> EMPLEADOS </h2>
            <main>{children}</main>
        </div>
    )
}

export default Lateral
