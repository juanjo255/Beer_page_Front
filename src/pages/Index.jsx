import React from 'react'
import index1 from "../media/index1.jpg"
import { useAuth0 } from '@auth0/auth0-react';
const Index = () => {
    const { isAuthenticated } = useAuth0();
    console.log("index",isAuthenticated)
    return (
        <div>

            CONTENIDO
            <img src={index1} alt="cervezas" className="h-40" />
            <img src={index1} alt="cervezas" className="h-40" />
            <img src={index1} alt="cervezas" className="h-40" />
            
        </div>
    )
}

export default Index
