import React from "react";
import { HeadFC, PageProps } from "gatsby";
import { NavbarLoginComponent } from "../components/Navbar/NavbarLoginComponent";
import { FooterComponent } from "../components/FooterComponent";
import { LoginComponent } from "../components/Login/LoginComponent";

const HomePacientePage: React.FC<PageProps> = () => {
  return (
    <div>
      <NavbarLoginComponent />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 py-8 dark:bg-gray-800">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold dark:text-white">
            Ini
          </h1>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePacientePage;

export const Head: HeadFC = () => <title>Iniciar sesión</title>;
