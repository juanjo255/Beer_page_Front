import Sidebar from 'components/Sidebar'
import SidebarResponsive from 'components/SidebarResponsive'
import React from 'react'
import PrivateRoute from 'components/PrivateRoute'

const PrivateLayout = ({children}) => {
    return (
        <PrivateRoute>
            <div className = "flex flex-col md:flex-row flex-nowrap w-screen h-screen" >
                <Sidebar/>
                <SidebarResponsive/>
                <main className = "w-full">{children}</main>
            </div>
        </PrivateRoute>
    )
}

export default PrivateLayout;
