import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({children}) => {

    const { isAuthenticated } = useAuth0();
    return isAuthenticated ? <> {children}</> : <div className="flex justify-center text-4xl font-mono">NO ESTAS AUTORIZADO</div>;
}

export default PrivateRoute;
