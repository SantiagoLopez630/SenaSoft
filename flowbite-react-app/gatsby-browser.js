import "./src/styles/global.css";
import React from 'react';
import { AuthProvider } from './src/Authenticate/AuthContext';

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
);