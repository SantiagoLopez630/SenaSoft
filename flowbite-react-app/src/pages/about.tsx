// src/pages/contact.tsx
import React from "react";
import { HeadFC, PageProps } from "gatsby";
import { NavbarComponent } from "../components/Navbar/NavbarComponent";
import { FooterComponent } from "../components/FooterComponent";

const AboutPage: React.FC<PageProps> = () => {
  return (
    <>
      <NavbarComponent />
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold dark:text-white">
          quienes somos
        </h1>
        <FooterComponent />
      </div>
    </>
  );
};

export default AboutPage;

export const Head: HeadFC = () => <title>¿Quiénes somos?</title>;
