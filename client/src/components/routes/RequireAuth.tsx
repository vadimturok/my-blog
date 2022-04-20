import React, {FC} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks";


const RequireAuth: FC = (props: any) => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Navigate to={'/login'}/>
};

export default RequireAuth;