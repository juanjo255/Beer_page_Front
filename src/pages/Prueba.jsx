import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const Prueba = () => {
    const { user, isAuthenticated } = useAuth0();
    useEffect(() => {
        console.log (user)
        console.log (isAuthenticated)
    }, [user, isAuthenticated])
    return <div>PROBANDO</div>
}

export default Prueba;
