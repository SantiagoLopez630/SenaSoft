"use client";

import { Pagination } from "flowbite-react";
import React, { useState } from "react";

// Lista de servicios con título, descripción e imagen
const servicios = [
  {
    titulo: "Limpieza Dental",
    descripcion:
      "Una limpieza profunda para eliminar la placa y el sarro de los dientes.",
    imagen: "/images/pagination/LimpiezaDental.jpg",
  },
  {
    titulo: "Blanqueamiento Dental",
    descripcion:
      "Tratamiento para aclarar el color de los dientes y mejorar la sonrisa.",
    imagen: "/images/pagination/BlanqueamientoDental.jpg",
  },
  {
    titulo: "Ortodoncia",
    descripcion:
      "Corrección de la posición de los dientes mediante brackets o alineadores.",
    imagen: "/images/pagination/Ortodoncia.jpg",
  },
  {
    titulo: "Implantes Dentales",
    descripcion: "Reemplazo de dientes perdidos con implantes permanentes.",
    imagen: "/images/pagination/ImplantesDentales.jpg",
  },
  {
    titulo: "Endodoncia",
    descripcion:
      "Tratamiento del conducto radicular para salvar un diente infectado.",
    imagen: "/images/pagination/Endodoncia.jpg",
  },
  {
    titulo: "Extracción Dental",
    descripcion: "Remoción de dientes dañados o en mal estado.",
    imagen: "/images/pagination/ExtraccionDental.jpg",
  },
  {
    titulo: "Carillas Dentales",
    descripcion:
      "Finas láminas de porcelana para mejorar la estética de los dientes.",
    imagen: "/images/pagination/CarillasDentales.jpg",
  },
  {
    titulo: "Periodoncia",
    descripcion:
      "Tratamiento de enfermedades de las encías y estructuras de soporte de los dientes.",
    imagen: "/images/pagination/LimpiezaDental.jpg",
  },
  {
    titulo: "Prótesis Dentales",
    descripcion:
      "Dispositivos removibles o fijos para restaurar dientes perdidos.",
    imagen: "/images/pagination/ProtesisDentales.jpg",
  },
  {
    titulo: "Odontopediatría",
    descripcion: "Cuidado dental especializado para niños.",
    imagen: "/images/pagination/Odontopediatria.jpg",
  },
];

export function ServicesComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  // Obtener el servicio actual basado en la página
  const servicioActual = servicios[(currentPage - 1) % servicios.length];

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      {/* Título del servicio */}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {servicioActual.titulo}
      </h1>

      {/* Imagen del servicio */}
      <img
        src={servicioActual.imagen}
        alt={servicioActual.titulo}
        className="w-full max-w-lg rounded-lg shadow-md" // Aumenta el tamaño aquí
      />

      {/* Descripción del servicio */}
      <p className="text-center text-lg text-gray-700 dark:text-gray-300">
        {servicioActual.descripcion}
      </p>

      {/* Paginación */}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={servicios.length}
          onPageChange={onPageChange}
          previousLabel="Atras"
          nextLabel="Siguiente"
          showIcons
        />
      </div>
    </div>
  );
}
