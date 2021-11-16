import { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

const useActiveRoutes = (ruta) => {
    const location = useLocation();
    const [active, setActive] = useState(false);

    //console.log("apth", location);
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
