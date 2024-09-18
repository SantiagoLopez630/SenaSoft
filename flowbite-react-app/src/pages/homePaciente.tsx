// src/components/PrivateRoute.tsx
import React from 'react';
import { Redirect } from 'gatsby';
import { useAuth } from '../Authenticate/AuthContext'; // Ajusta la ruta según tu estructura

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Redirect to="/login" />;
};

export default PrivateRoute;
