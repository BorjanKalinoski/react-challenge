import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {RouteProps} from "react-router";

interface Props extends RouteProps{
    component: any; // react component
}

const ProtectedRoute: React.FC<Props> = ({component: Component, ...others}) => {
    const {currentUser} = useAuth()!;

    return <Route {...others} render={(props) => currentUser
        ? <Component {...props}/>
        : <Redirect to='/login'/>}
    />;
    };

export default ProtectedRoute
