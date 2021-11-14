import { useUser } from 'context/UserContext'
import React from 'react'

const PrivateRoute = ({roleList, children}) => {
    const {userData} = useUser()
    if (roleList.includes (userData.rol)){
        return {children};
    };
    return (
        <div className="bg-black h-full">
            <h1 className=" flex h-full justify-center items-center text-6xl text-yellow-500 font-mono"> 
            No estas autorizado</h1>
        </div>
    );
};

export default PrivateRoute;
