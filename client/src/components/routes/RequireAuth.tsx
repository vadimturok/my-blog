import React, {FC} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks";


const RequireAuth: FC = () => {
    const {token} = useAuth()
    return !!token ? <Outlet/> : <Navigate to={'/login'}/>
};

export default RequireAuth;