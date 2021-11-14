import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { obtenerDatosEmpleado } from 'utils/api';

const PrivateRoute = ({children}) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    
    useEffect (()=>{
        const fetchAuth0Token = async ()=> {
            const accessToken = await getAccessTokenSilently({
                audience:'https://api-cerverceria-autenticacion/',
                    });
            localStorage.setItem("token", accessToken);
            //await obtenerDatosEmpleado ((res) => {console.log ("respuesta", res)}, (error) => {
           //     console.log("error obteniendo datos de usuario", error)});
            }
        if (isAuthenticated){
            fetchAuth0Token();
        }
    },[isAuthenticated, getAccessTokenSilently]);
    
    if (isLoading) {
        return (
        <div className = "flex flex-col h-screen justify-center items-center bg-black">
            <ReactLoading type="bubbles" color="yellow" height={200} width={200} />  
        </div>
        );
    }
    if (!isAuthenticated){
        return loginWithRedirect();
    }
    
    return  (<div> {children} </div>);
};

export default PrivateRoute;
