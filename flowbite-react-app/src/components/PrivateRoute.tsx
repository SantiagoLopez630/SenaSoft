import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Authenticate/AuthContext'; // Asegúrate de que esta ruta sea correcta

const PrivateRoute: React.FC<{ component: React.ComponentType<any>, ...rest: any }> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
