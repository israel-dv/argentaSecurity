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
      fullDescription: 'Convertimos a los guardias en Especialistas en Protección y Riesgos (EPR), enfocados en la prevención,  el control y la protección de personas, activos y operación.',
      delay: 100,
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Desarrollo de personal',
      description: 'Formación que genera resultados',
      fullDescription: 'Profesionalizamos a nuestros guardias (EPR) mediante un sistema de niveles especializados que fortalecen la toma de decisiones y reducen errores críticos que impactan tu operación.',
      delay: 200,
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Gestión de riesgos',
      description: 'Prevención inteligente que protege tu operación',
      fullDescription: 'Con nuestra herramienta PRISMA analizamos el riesgo desde todos los ángulos con el objetivo de asignar los recursos de seguridad donde realmente aportan valor',
      delay: 300,
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Estrategias de Seguridad Específicas',
      description: 'Soluciones hechas a tu medida',
      fullDescription: 'APOLO es nuestra asesoría integral con criterio experto para decisiones de seguridad con impacto real en el negocio.',
      delay: 400,
    },
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: 'Plataforma perfonalizada',
      description: 'Reportes digitales online',
      fullDescription: 'Mediante SILVER, la plataforma digital de Argenta que centraliza la información operativa, generamos trazabilidad auditable con evidencias y respaldamos la toma de decisiones en la gestión de riesgos y la mejora continua.',
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
