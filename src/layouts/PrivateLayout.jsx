import Sidebar from 'components/Sidebar'
import SidebarResponsive from 'components/SidebarResponsive'
import React from 'react'

const PrivateLayout = ({children}) => {
    return (
        <div className = "flex flex-col md:flex-row flex-nowrap w-screen h-screen" >
            <Sidebar/>
            <SidebarResponsive/>
            <main className = "w-full">{children}</main>
        </div>
    )
}

export default PrivateLayout
