"use client";

import { Footer } from "flowbite-react";
import React from "react";

export function FooterComponent() {
  return (
    <Footer container>
      <Footer.Copyright href="/" by="OdontoNet™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
