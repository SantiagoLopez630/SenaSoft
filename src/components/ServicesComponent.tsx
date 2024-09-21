"use client";

import { Pagination } from "flowbite-react";
import React, { useState } from "react";

// Lista de servicios con título, descripción e imagen
const servicios = [
  {
    titulo: "Limpieza Dental",
    descripcion:
      "Una limpieza profunda para eliminar la placa y el sarro de los dientes.",
    imagen: "/images/pagination/LimpiezaDental.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Blanqueamiento Dental",
    descripcion:
      "Tratamiento para aclarar el color de los dientes y mejorar la sonrisa.",
    imagen: "https://example.com/blanqueamiento-dental.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Ortodoncia",
    descripcion:
      "Corrección de la posición de los dientes mediante brackets o alineadores.",
    imagen: "https://example.com/ortodoncia.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Implantes Dentales",
    descripcion: "Reemplazo de dientes perdidos con implantes permanentes.",
    imagen: "https://example.com/implantes-dentales.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Endodoncia",
    descripcion:
      "Tratamiento del conducto radicular para salvar un diente infectado.",
    imagen: "https://example.com/endodoncia.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Extracción Dental",
    descripcion: "Remoción de dientes dañados o en mal estado.",
    imagen: "https://example.com/extraccion-dental.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Carillas Dentales",
    descripcion:
      "Finas láminas de porcelana para mejorar la estética de los dientes.",
    imagen: "https://example.com/carillas-dentales.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Periodoncia",
    descripcion:
      "Tratamiento de enfermedades de las encías y estructuras de soporte de los dientes.",
    imagen: "https://example.com/periodoncia.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Prótesis Dentales",
    descripcion:
      "Dispositivos removibles o fijos para restaurar dientes perdidos.",
    imagen: "https://example.com/protesis-dentales.jpg", // Reemplazar con una URL real
  },
  {
    titulo: "Odontopediatría",
    descripcion: "Cuidado dental especializado para niños.",
    imagen: "https://example.com/odontopediatria.jpg", // Reemplazar con una URL real
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
      <h1 className="text-2xl font-bold">{servicioActual.titulo}</h1>

      {/* Imagen del servicio */}
      <img
        src={servicioActual.imagen}
        alt={servicioActual.titulo}
        className="w-full max-w-xs rounded-lg shadow-md"
      />

      {/* Descripción del servicio */}
      <p className="text-center text-lg">{servicioActual.descripcion}</p>

      {/* Paginación */}
      <Pagination
        layout="pagination"
        currentPage={currentPage}
        totalPages={servicios.length}
        onPageChange={onPageChange}
        previousLabel="Go back"
        nextLabel="Go forward"
        showIcons
      />
    </div>
  );
}
