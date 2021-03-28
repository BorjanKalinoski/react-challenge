import React from 'react';
import { RouteProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Props extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...others }) => {
  const { authUserData } = useAuth()!;

  return (
    <Route
      {...others}
      render={(props) => (!authUserData ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default ProtectedRoute;
