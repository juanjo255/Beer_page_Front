import react, { useState, useEffect } from 'react'
import Sidebar from 'components/Sidebar'
import SidebarResponsive from 'components/SidebarResponsive'
import BusquedaLateral from 'components/BusquedaLateral'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/UserContext';

const PrivateLayout = ({children}) => {
    const [busqueda, setBusqueda] = useState("HOLA")
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [loadingUserInfo, setLoadingUserInfo] = useState(false);
    const {setUserData} = useUser();
    
    useEffect (()=>{
        const fetchAuth0Token = async ()=> {
            setLoadingUserInfo (true);
            const accessToken = await getAccessTokenSilently({
                audience:'https://api-cerverceria-autenticacion/',
                    });
            localStorage.setItem("token", accessToken);
            await obtenerDatosUsuario ((res) => {
                setUserData(res.data);
                setLoadingUserInfo(false);
            },
            (error) => {
                console.log("error obteniendo datos de usuario", error)});
                setLoadingUserInfo(false);
            }
        if (isAuthenticated){
            fetchAuth0Token();
        }
    },[isAuthenticated, getAccessTokenSilently, setUserData, setLoadingUserInfo]);
    
    if (isLoading ) {
        return (
        <div className = "flex flex-col h-screen justify-center items-center bg-black">
            <ReactLoading type="bubbles" color="yellow" height={200} width={200} />  
        </div>
        );
    }
    if (!isAuthenticated){
        return loginWithRedirect();
    }
    return (
            <div className = "flex md:flex-row flex-nowrap w-screen h-screen overflow-hidden" >
                <Sidebar/>
                <SidebarResponsive/>
                <BusquedaLateral setBusqueda={setBusqueda}/>
                <main className = "w-screen" busqueda={busqueda}>{children}</main>
            </div>
    )
}

export default PrivateLayout;
