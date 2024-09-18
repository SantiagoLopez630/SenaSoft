"use client"; 

import { Button } from "flowbite-react";
import React, { useState } from "react";
import axios from 'axios'; 
import { navigate } from "gatsby"; 
import Cookies from 'js-cookie'; 

export function LoginComponent() {
  const [docNumber, setDocNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/login_paciente/", {
        nro_doc: docNumber,
        contrasena: password
      });
  
      console.log("Respuesta del servidor completa:", response);
      console.log("Inicio de sesión exitoso:", response.data);
      Cookies.set('user_id', response.data.id, { expires: 1 });
      Cookies.set('user_role', response.data.rol, { expires: 1 });
  
      navigate("/homePaciente");
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error capturado:", error);
  
        if (error.response) {
          const apiErrors = error.response.data;
          console.log("Errores específicos de la API:", apiErrors);
          if (apiErrors.nro_doc) {
            setError(apiErrors.nro_doc.join(' '));
          } else if (apiErrors.contrasena) {
            setError(apiErrors.contrasena.join(' '));
          } else {
            setError("Error del servidor");
          }
        } else {
          setError("Error de red o del servidor");
        }
      } else {
        console.error("Error inesperado:", error);
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-gray-200 p-6 shadow-md dark:bg-gray-900">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="docNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Número de documento
          </label>
          <input
            type="text"
            id="docNumber"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 sm:text-sm"
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <hr className="grow border-gray-500 dark:border-gray-700" />
        <span className="mx-4 text-gray-500 dark:text-gray-400">o</span>
        <hr className="grow border-gray-500 dark:border-gray-700" />
      </div>

      <Button color="light" className="mb-4 w-full" href="/register">
        Crear cuenta
      </Button>

      <div className="text-center">
        <a
          href="/forgot-password"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ¿Olvidaste tu correo electrónico o contraseña?
        </a>
      </div>
    </div>
  );
}
