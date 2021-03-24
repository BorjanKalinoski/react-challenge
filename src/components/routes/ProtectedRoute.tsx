import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {RouteProps} from "react-router";

interface Props extends RouteProps{
    component: any;
}

const ProtectedRoute: React.FC<Props> = ({component: Component, ...others}) => {
    const {currentUser} = useAuth()!;

    console.log('user is!', currentUser);

    return <Route {...others} render={(props) => currentUser
        ? <Component {...props}/>
        : <Redirect to='/login'/>}
    />;
    };

export default ProtectedRoute
