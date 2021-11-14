import Sidebar from 'components/Sidebar'
import SidebarResponsive from 'components/SidebarResponsive'
import React from 'react'
import PrivateRoute from 'components/PrivateRoute'
import BusquedaLateral from 'components/BusquedaLateral'
import { useEffect } from 'react'
import { useState } from 'react'

const PrivateLayout = ({children}) => {
    const [busqueda, setBusqueda] = useState("HOLA")
    console.log(children)
    return (
        <PrivateRoute>
            <div className = "flex md:flex-row flex-nowrap w-screen h-screen overflow-hidden" >
                <Sidebar/>
                <SidebarResponsive/>
                <BusquedaLateral setBusqueda={setBusqueda}/>
                <main className = "w-screen" busqueda={busqueda}>{children}</main>
            </div>
        </PrivateRoute>
    )
}

export default PrivateLayout;
