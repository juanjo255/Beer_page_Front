import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

const PrivateRoute = ({children}) => {

    const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    
    useEffect (()=>{
        const fetchAuth0Token = async ()=> {
            const accessToken = await getAccessTokenSilently({
                audience:'https://api-cerverceria-autenticacion/',
                    });
            localStorage.setItem("token", accessToken);
            }
        if (isAuthenticated){
            fetchAuth0Token();
        }
    },[isAuthenticated, getAccessTokenSilently]);
    
    
    if (!isAuthenticated){
        return (
        <div>
            <button onClick = {()=>{loginWithRedirect()}}
            >
                NO ESTAS AUTENTICADO, CLICK AQUI PARA REGISTRARTE
            </button>
        </div>
        );
    }
    
    return  (<div> {children} </div>);
};

export default PrivateRoute;
