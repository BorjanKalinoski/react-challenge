import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RouteProps } from 'react-router';

interface Props extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...others }) => {
  const { authUserData } = useAuth()!;

  return (
    <Route
      {...others}
      render={(props) => (authUserData ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
