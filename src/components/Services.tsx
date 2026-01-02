import React, { useRef, useEffect, useState } from 'react';
import { Users, Clock, ClipboardList, Shield, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fullDescription: string;
  delay: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  fullDescription,
  delay,
  isExpanded,
  onToggle,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };
  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg p-6 transform opacity-0 translate-y-10 transition duration-700 ease-out cursor-pointer hover:shadow-xl select-none"
      onClick={handleClick}
    >
      <div className="bg-[var(--primary-blue)]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
        <div className="text-[var(--primary-blue)]">{icon}</div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-[var(--primary-blue)]">
          {title}
        </h3>
        <div className="text-[var(--primary-blue)]">
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-gray-700 leading-relaxed">{fullDescription}</p>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const services = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Servicio de guardias intramuros',
      description: 'Protección con presencia y excelencia.',
      fullDescription: 'Nuestros profesionales cuentan con entrenamiento especializado alineado con estandares de Seguridad Nacionales e Internacionales, esquemas de supervisión constante y tecnología de apoyo que garantizan una vigilancia efectiva enfocada en la gestión y prevención de riesgos, adaptable a las necesidades de tu empresa.',
      delay: 100,
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Desarrollo de personal',
      description: 'Formación que genera resultados',
      fullDescription: 'Realizamos entrenamientos especializados para tus colaboradores en prevención de riesgos, control eficiente de accesos, manejo de crisis y protocolos de seguridad, asegurando que cada elemento sea capaz de identificar, contener y reportar de forma eficiente cualquier riesgo o amenaza que pueda comprometer la seguridad del personal y continuidad de las operaciones de tu organización.',
      delay: 200,
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Gestión de riesgos',
      description: 'Prevención inteligente que protege tu operación',
      fullDescription: 'Realizamos diagnósticos detallados de seguridad física, identificando vulnerabilidades y proponiendo soluciones efectivas y prácticas que permiten reducir riesgos y proteger activos de forma estratégica.',
      delay: 300,
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Estrategias de Seguridad Específicas',
      description: 'Soluciones hechas a tu medida',
      fullDescription: 'Desarrollamos planes de seguridad alineados a tu sector, tipo de operación y entorno, asegurando un control efectivo y una mitigación de riesgos con protocolos y procesos claros, medibles y efectivos.',
      delay: 400,
    },
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: 'Plataforma perfonalizada',
      description: 'Reportes digitales online',
      fullDescription: 'Generamos reportes digitales alimentados por la información de los guardias, con datos claves de seguridad, análisis de eventos y recomendaciones de mejora, permitiéndote contar con todo el contexto e indicadores de la operación de seguridad para supervisar y tomar decisiones informadas para tu negocio.',
      delay: 500,
    },
  ];

  return (
    <section id="services" className="bg-[var(--light-gray)] py-20">
      <div ref={sectionRef} className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold mb-12 opacity-0 translate-y-10 transition duration-700 ease-out"
          >
            Nuestros servicios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
         En Argenta transformamos la seguridad en un aliado estratégico para tu negocio. Nuestras soluciones de gestión de riesgos están respaldadas por estándares internacionales y tecnología avanzada para proteger tus recursos más valiosos y la reputación de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              fullDescription={service.fullDescription}
              delay={service.delay}
              isExpanded={expandedCard === index}
              onToggle={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
