"use client";

import { Button, Pagination, Progress } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { navigate } from "gatsby";

const initialFormData = {
  nro_doc: "",
  tip_doc: "",
  fec_exp: null,
  nom: "",
  ape: "",
  fec_nac: null,
  ciudad: "",
  sexo: "",
  dir: "",
  tel1: "",
  tel2: "",
  email: "",
  est: false, // Cambiado a false
  ant_med: "",
  tip_san: "",
  ocup: "",
  est_civ: "",
  fec_reg: null, // Cambiado a null
  contrasena: "",
  rol: null,
};

export function CreateAccount() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const finalData = { ...formData };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/pacientes/",
        finalData,
      );
      console.log("Cuenta creada exitosamente:", response.data);
      setMessage("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error de respuesta:", error.response.data);
          setError(
            "Error en la creación de la cuenta. Verifica los datos ingresados.",
          );
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

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-gray-200 p-6 shadow-md dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Crear Cuenta
      </h2>

      <Progress
        progress={(currentPage - 1) * 50}
        size="lg"
        textLabel={`${(currentPage - 1) * 50}% completado`}
      />

      <form onSubmit={handleSubmit}>
        {currentPage === 1 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="nro_doc"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Número de documento
              </label>
              <input
                type="text"
                id="nro_doc"
                name="nro_doc"
                value={formData.nro_doc}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="tip_doc"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tipo de documento
              </label>
              <input
                type="text"
                id="tip_doc"
                name="tip_doc"
                value={formData.tip_doc}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fec_exp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fecha de expedición
              </label>
              <input
                type="date"
                id="fec_exp"
                name="fec_exp"
                value={formData.fec_exp || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ape"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Apellido
              </label>
              <input
                type="text"
                id="ape"
                name="ape"
                value={formData.ape}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </>
        )}

        {currentPage === 2 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="ciudad"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="sexo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Sexo
              </label>
              <select
                id="sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Selecciona</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dir"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Dirección
              </label>
              <input
                type="text"
                id="dir"
                name="dir"
                value={formData.dir}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="tel1"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Teléfono 1
              </label>
              <input
                type="tel"
                id="tel1"
                name="tel1"
                value={formData.tel1}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="tel2"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Teléfono 2
              </label>
              <input
                type="tel"
                id="tel2"
                name="tel2"
                value={formData.tel2}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </>
        )}

        {currentPage === 3 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="fec_nac"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Fecha de nacimiento
              </label>
              <input
                type="date"
                id="fec_nac"
                name="fec_nac"
                value={formData.fec_nac || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ant_med"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Antecedentes médicos
              </label>
              <input
                type="text"
                id="ant_med"
                name="ant_med"
                value={formData.ant_med}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="tip_san"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tipo de sangre
              </label>
              <input
                type="text"
                id="tip_san"
                name="tip_san"
                value={formData.tip_san}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ocup"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ocupación
              </label>
              <input
                type="text"
                id="ocup"
                name="ocup"
                value={formData.ocup}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="est_civ"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Estado civil
              </label>
              <input
                type="text"
                id="est_civ"
                name="est_civ"
                value={formData.est_civ}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contrasena"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </>
        )}

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {message && <div className="mb-4 text-green-500">{message}</div>}

        <div className="mb-4 flex justify-between">
          {currentPage > 1 && (
            <Button onClick={handlePrevPage} color="gray">
              Anterior
            </Button>
          )}
          {currentPage < 3 && (
            <Button onClick={handleNextPage} color="blue">
              Siguiente
            </Button>
          )}
          {currentPage === 3 && (
            <Button type="submit" color="green" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          )}
        </div>

        <Pagination
          layout="navigation"
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </form>
    </div>
  );
}
