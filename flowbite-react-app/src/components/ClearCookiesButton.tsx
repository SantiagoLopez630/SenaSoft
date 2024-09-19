import React from 'react';
import Cookies from 'js-cookie';

export const ClearCookiesButton = () => {
  const clearCookies = () => {
    Cookies.remove('user_id');
    Cookies.remove('user_role');
    Cookies.remove('isAuthenticated');
    console.log('Cookies eliminadas');
    window.location.reload();
  };

  return (
    <button
      onClick={clearCookies}
      className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-red-600"
    >
      Cerrar sesión
    </button>
  );
};
