import React, { useRef, useEffect } from 'react';

const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={textRef}
            className="opacity-0 translate-y-10 transition duration-700 ease-out"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--primary-blue)]">
              ¿Quiénes somos?
            </h2>
            <p className="text-gray-600 mb-6">
    Somos una compañía mexicana dedicada a crear valor real para nuestros clientes. Analizamos  a profundidad su entorno de riesgos y diseñamos soluciones a la medida basadas en datos, tendencias, protocolos y estándares internacionales. Nuestro compromiso va más allá de la seguridad: fortalecemos la seguridad de tu empresa, reducimos la rotación de guardias mediante beneficios y programas de crecimiento y profesionalización además de que construimos relaciones de confianza que garantizan la continuidad y tranquilidad en cada proyecto.
            </p>
             <p className="text-gray-600 mb-6">
               Sabemos que cada <b>cliente</b> es único, por eso personalizamos cada solución de seguridad con base en <b>análisis de riesgos profundos, procesos estandarizados bajo normativas nacionales e internacionales, simulaciones de escenarios críticos y entrenamiento continuo de nuestro personal</b>.
               </p>
 <p className="text-gray-600 mb-6">
   En <b>Argenta</b>, no vendemos servicios, <b>construimos confianza, blindamos operaciones y contribuimos a la continuidad de tu negocio en un entorno complejo y retador</b>.

           </p>
            <p className="text-gray-600 mb-6">
              <h3 className="text-xl font-semibold mb-3 text-[var(--primary-blue)]">
                Nuestra misión
              </h3>
              Proteger lo que más valoras con inteligencia, tecnología y
              soluciones integrales.
            </p>
            <p className="text-gray-600 mb-6">
              <h3 className="text-xl font-semibold mb-3 text-[var(--primary-blue)]">
                Nuestra visión
              </h3>
Ser el aliado estratégico para proteger la continuidad de nuestros clientes y el modelo a seguir para profesionalizar y dignificar la labor del guardia de seguridad.
            </p>

            <p className="text-gray-600 mb-6">
              <h3 className="text-xl font-semibold mb-3 text-[var(--primary-blue)]">
                Nuestros valores
              </h3>
            </p>

            <div className="mb-8">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-[var(--primary-blue)]/10 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Integridad </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[var(--primary-blue)]/10 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Lealtad </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[var(--primary-blue)]/10 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Responsabilidad </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[var(--primary-blue)]/10 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Confidencialidad </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[var(--primary-blue)]/10 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Profesionalismo </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[var(--primary-blue)]/10 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Sustentabilidad </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[var(--primary-blue)]/10 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Innovación </span>

                </li>
              </ul>
            </div>
          </div>

          <div
            ref={imageRef}
            className="opacity-0 translate-x-10 transition duration-700 ease-out"
          >
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/images/guardia-quienes-somos.jpg"
                  alt="Equipo de Argenta Seguridad"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <img
                  src="/images/Argenta_Shield_Small.png"
                  alt="Operaciones de seguridad"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
