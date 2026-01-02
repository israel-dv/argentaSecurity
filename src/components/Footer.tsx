import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const [jobFormData, setJobFormData] = React.useState({
    name: '',
    position: '',
    phone: '',
    email: '',
  });

  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJobFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job application:', jobFormData);
    // Reset form
    setJobFormData({
      name: '',
      position: '',
      phone: '',
      email: '',
    });
  };

  const footerLinks = {
    company: [
      { name: 'Nosotros', href: '#about' },
      { name: 'Contacto', href: '#contact' },

    ],
    services: [
      { name: 'Servicio de Guardias de Seguridad', href: '#services' },
      { name: 'Entrenamientos', href: '#services' },
      { name: 'Análisis de Riesgos', href: '#services' },
      { name: 'Estrategias de Seguridad Específicas', href: '#services' },
      { name: 'Tecnología de Vigilancia y Monitoreo de Riesgos', href: '#services' },
      { name: 'Reportes Digitales de Seguridad', href: '#services' },

    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Capacitación', href: '#training' },
      { name: 'Casos de Éxito', href: '#case-studies' },
      { name: 'Preguntas Frecuentes', href: '#faq' },
    ],
  };

  return (
    <footer id="jobs" className="bg-[var(--primary-blue)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/images/argenta_final_logo.png"

                alt="Argenta Security"
                className="h-12 w-auto"
              />
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-3">
            <form onSubmit={handleJobFormSubmit} className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6 text-white">
                Forma parte de nuestro equipo de trabajo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label htmlFor="job-name" className="block text-white/90 mb-2 text-sm">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="job-name"
                    name="name"
                    value={jobFormData.name}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="job-position" className="block text-white/90 mb-2 text-sm">
                    Puesto
                  </label>
                  <input
                    type="text"
                    id="job-position"
                    name="position"
                    value={jobFormData.position}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Puesto de interés"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="job-phone" className="block text-white/90 mb-2 text-sm">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="job-phone"
                    name="phone"
                    value={jobFormData.phone}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Tu número de teléfono"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="job-email" className="block text-white/90 mb-2 text-sm">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="job-email"
                    name="email"
                    value={jobFormData.email}
                    onChange={handleJobFormChange}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-white text-[var(--primary-blue)] px-6 py-2 rounded-md flex items-center gap-2 hover:bg-white/90 transition duration-300 font-medium"
              >
                Enviar solicitud <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 mb-4 md:mb-0">
            &copy; {currentYear} Argenta Risk Management. Todos los derechos
            reservados.
          </p>

          <div className="flex flex-wrap justify-center space-x-4">
            <a
              href="#"
              className="text-white/80 hover:text-white transition duration-300"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition duration-300"
            >
              Términos de Servicio
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition duration-300"
            >
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
