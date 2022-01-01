import { useState, useEffect } from 'react'
import Sidebar from 'components/Sidebar'
import SidebarResponsive from 'components/SidebarResponsive'
import BusquedaLateral from 'components/BusquedaLateral'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/userContext';


const PrivateLayout = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [loadingUserInfo, setLoadingUserInfo] = useState(false);
    const {setUserData} = useUser();
    
    useEffect (()=>{

        const fetchAuth0Token = async ()=> {
            
            try {
            //1. pedir token
            setLoadingUserInfo (true);
            const accessToken = await getAccessTokenSilently({
                audience:'https://api-cerverceria-autenticacion/',
                    });
            
            //2. recibir token de auth0
            localStorage.setItem("token", accessToken);

            //3. enviar al backend
            await obtenerDatosUsuario (
                (res) => {
                    setUserData(res.data);
                    setLoadingUserInfo(false);
                },
                (error) => {
                    console.log("error obteniendo datos del usuario", error)});
                    setLoadingUserInfo(false);

                }catch(err) {
                    alert(err)
                }
            }
        if (isAuthenticated){
            fetchAuth0Token().catch(err => alert(err.message));
        }
    },[isAuthenticated, getAccessTokenSilently, setUserData]);
    
    if (isLoading || loadingUserInfo) {
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
                <BusquedaLateral />
                <main className = "w-screen">{ children }</main>
            </div>
    )
}

export default PrivateLayout;
