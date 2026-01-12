import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: 'Servicio de seguridad privada con gestión de riesgos',
      subtitle:
        'Convertimos la seguridad en una ventaja clave para tu negocio',
      image:
        'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg',
    },
    {
      title: 'Sistemas de Protección Avanzados',
      subtitle: 'Tecnología de vanguardia combinada con personal experto',
      image:
        'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg',
    },
    /*
    {
      title: 'Estándares Globales de Seguridad',
      subtitle:
        'Implementando el más alto nivel de protocolos de seguridad en todo el mundo',
      image:
        'https://images.pexels.com/photos/6964115/pexels-photo-6964115.jpeg',
    },
 */
  ];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      style={{
        background: `linear-gradient(rgba(10, 19, 39, 1), rgba(10, 29, 49, 1)), url(${slides[currentSlide].image})`,
        /* rgba(10, 19, 39, 1)*/
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background 1s ease-in-out',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div
            className={`max-w-3xl mx-auto transition-opacity duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/images/Argenta_Shield_Small.png"
              alt="Argenta Security"
              className="h-12 sm:h-16 md:h-20 w-auto mx-auto mb-6 max-w-xs sm:max-w-sm"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">

            </div>
          </div>
        </div>
      </div>

      {/* Carousel indicators */}

    </section>
  );
};

export default Hero;
