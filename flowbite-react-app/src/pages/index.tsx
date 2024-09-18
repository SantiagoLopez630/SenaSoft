import { Link, type HeadFC, type PageProps } from "gatsby";
import * as React from "react";
import { NavbarComponent } from "../components/Navbar/NavbarComponent";
import { FooterComponent } from "../components/FooterComponent";
import { Carousel, Accordion, Button, Card } from "flowbite-react";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div>
      <NavbarComponent />

      <div className="h-32 sm:h-64 xl:h-96 2xl:h-96">
        <Carousel slideInterval={5000}>
          <img src="/images/carousel/image1.png" alt="image1" />
          <img src="/images/carousel/image2.png" alt="image2" />
          <img src="/images/carousel/image3.png" alt="image3" />
          <img src="/images/carousel/image4.png" alt="image4" />
          <img src="/images/carousel/image5.png" alt="image5" />
        </Carousel>
      </div>

      <main className="flex min-h-screen flex-col items-center justify-center gap-6 py-8 dark:bg-gray-800">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold dark:text-white">
            Bienvenido a <strong>OdontoNet</strong>
          </h1>
          <hr className="mx-auto mb-6 w-24 border-t-2 border-cyan-800 dark:border-gray-600" />
          <p className="mx-20 text-lg text-gray-700 dark:text-gray-300">
            <strong className="mb-2 block">¡Bienvenido a OdontoNet!</strong>
            En nuestra clínica dental, nos dedicamos a brindarte una experiencia
            de atención odontológica de la más alta calidad. Gracias a nuestra
            innovadora plataforma en línea, ahora puedes solicitar tu cita de
            manera rápida y conveniente, desde la comodidad de tu hogar. Nuestro
            equipo de profesionales está listo para ofrecerte un cuidado
            personalizado y eficiente, asegurando que cada visita sea cómoda y
            sin estrés. No esperes más para cuidar de tu salud dental; agenda tu
            cita en OdontoNet hoy mismo y da el primer paso hacia una sonrisa
            más saludable.
          </p>
        </div>
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold dark:text-white">
            ¿Por qué preferirnos?
          </h1>
          <hr className="mx-auto mb-6 w-24 border-t-2 border-cyan-800 dark:border-gray-600" />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:gap-16">
          {/* Imagen al lado izquierdo */}
          <div className="w-36 lg:w-1/3">
            <img
              src="/images/acordion1.png"
              alt="Dental Clinic"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full lg:w-2/3">
            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>¿Por qué elegir OdontoNet?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    En OdontoNet, estamos comprometidos con tu salud dental y
                    bienestar...
                  </p>
                  <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <strong>Atención Personalizada:</strong> Nos
                      enorgullecemos de ofrecer una atención personalizada...
                    </li>
                    <li>
                      <strong>Tecnología Avanzada:</strong> Utilizamos la última
                      tecnología en odontología...
                    </li>
                    <li>
                      <strong>Comodidad y Conveniencia:</strong> Gracias a
                      nuestra plataforma en línea...
                    </li>
                  </ul>
                  <p className="text-gray-500 dark:text-gray-400">
                    Al elegir OdontoNet, no solo eliges un lugar para tus
                    tratamientos dentales...
                  </p>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>¿Qué servicios ofrecemos?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    En OdontoNet, ofrecemos una amplia gama de servicios
                    dentales...
                  </p>
                  <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <strong>Limpiezas Dentales:</strong> Mantén tu salud
                      dental en óptimas condiciones...
                    </li>
                    <li>
                      <strong>Blanqueamiento Dental:</strong> Mejora el aspecto
                      de tu sonrisa...
                    </li>
                  </ul>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>
                  ¿Cómo garantizamos tu satisfacción?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    En OdontoNet, tu satisfacción es nuestra prioridad...
                  </p>
                  <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <strong>Comunicación Abierta:</strong> Mantenemos una
                      comunicación clara...
                    </li>
                    <li>
                      <strong>Cuidado Continuo:</strong> Nuestro compromiso no
                      termina con el tratamiento...
                    </li>
                  </ul>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>

            <div className="mt-8 flex w-full flex-col space-y-4 lg:w-2/3">
              <Card className="bg-blue-500 p-2 text-white">
                <h5 className="text-2xl font-bold tracking-tight">
                  Descubre una nueva razón para sonreír cada día
                </h5>
                <p className="mt-2 font-normal">
                  Sonríe con confianza, no esperes más para lucir una sonrisa
                  radiante y saludable. Reserva tu cita odontológica en nuestras
                  clínicas de OdontoNet.
                </p>
                <Link to="/login">
                  <Button color="light" className="mt-4">
                    AGENDA AHORA
                  </Button>
                </Link>
              </Card>

              <Card className="bg-cyan-800 p-2 text-white">
                <h5 className="text-2xl font-bold tracking-tight">
                  ¿Trabajas con nosotros?
                </h5>
                <p className="mt-2 font-normal">
                  Cumple con todos tus funciones como trabajador de una manera
                  rápida y sencilla.
                </p>
                <Link to="/loginWorker">
                  <Button color="light" className="mt-4">
                    COMIENZA AHORA!
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <FooterComponent />
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>OdontoNet</title>;
