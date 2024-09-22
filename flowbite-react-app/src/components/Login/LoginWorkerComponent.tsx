"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "gatsby";
import Cookies from "js-cookie";

export function LoginWorkerComponent() {
  const [docNumber, setDocNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/homeWorker");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login_empleado/",
        {
          nro_doc: docNumber,
          contrasena: password,
        },
      );

      console.log("Inicio de sesión exitoso:", response.data);

      Cookies.set("isAuthenticated", "true", { expires: 1 });
      Cookies.set("user_id", response.data.id, { expires: 1 });
      Cookies.set("user_role", response.data.rol, { expires: 1 });

      navigate("/homeWorker");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;

          // Manejar errores según el estado HTTP
          if (status === 401) {
            setError("Credenciales incorrectas. Inténtalo de nuevo.");
          } else if (status === 400) {
            setError("Por favor, verifica los datos ingresados.");
          } else if (status === 500) {
            setError("Error en el servidor. Por favor, inténtalo más tarde.");
          } else {
            setError("Ocurrió un error inesperado.");
          }
        } else {
          setError("Error de red o del servidor.");
        }
      } else {
        setError("Error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-gray-200 p-6 shadow-md dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="docNumber" value="Número de documento" />
          </div>
          <TextInput
            id="docNumber"
            type="text"
            placeholder="12345678"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Tu contraseña" />
          </div>
          <TextInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Recuerdame</Label>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
}
