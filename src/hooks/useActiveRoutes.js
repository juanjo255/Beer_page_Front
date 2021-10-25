import { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

const useActiveRoutes = (ruta) => {
    const location = useLocation();
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (location.pathname.includes (ruta)){
            setActive (true);
        } else {
            setActive (false);
        }
    }, [location, ruta])
    return active;
}

export default useActiveRoutes
