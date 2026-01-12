import React, {useState, useRef, useEffect} from 'react';
import {Send, Mail, MapPin} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            location: '',
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.1}
    );

    if ( formRef.current ) observer.observe(formRef.current);
    if ( infoRef.current ) observer.observe(infoRef.current);

    return () => {
      if ( formRef.current ) observer.unobserve(formRef.current);
      if ( infoRef.current ) observer.unobserve(infoRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ( {...prev, [name]: value} ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        location: '',
      });
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    // {
    //   icon: <Phone className="h-5 w-5"/>,
    //   title: 'Teléfono',
    //   details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    // },
    {
      icon: <Mail className="h-5 w-5"/>,
      title: 'Correo',
      details: ['administracion@argentaseguridad.com'],
    },
    {
      icon: <MapPin className="h-5 w-5"/>,
      title: 'Dirección corporativa',
      details: ['', 'Celaya, Guanajuato, México'],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-[var(--light-gray)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--primary-blue)]">
            Contáctanos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 opacity-0 translate-y-10 transition duration-700 ease-out"
          >
            <h3 className="text-2xl font-bold mb-6 text-[var(--primary-blue)]">
              Estamos para ayudarte
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-gray-700 mb-2">
                  ¿De dónde nos escribes?
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
              </div>

            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Tu mensaje (servicio de interés)
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[var(--primary-blue)] text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[var(--secondary-blue)] transition duration-300 w-full"
            >
              Enviar <Send className="h-5 w-5"/>
            </button>

            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                ¡Gracias por tu mensaje! Te contactaremos pronto.
              </div>
            )}
          </form>

          <div
            ref={infoRef}
            className="opacity-0 translate-y-10 transition duration-700 ease-out"
          >
            <div className="bg-[var(--primary-blue)] rounded-lg shadow-lg p-8 text-white h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Medios de contacto</h3>
              <p className="mb-8">
                Nuestros expertos en gestión de riesgos atenderán tus requerimientos para proporcionar soluciones
                adaptadas a tus necesidades.
              </p>

              <div className="space-y-6 mb-auto">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-white/10 p-3 rounded-full mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h4>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-white/80">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
