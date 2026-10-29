import { HERO_IMAGE } from '@/data';

export const Hero = () => {
  return (
    <section id="inicio" className="relative w-full overflow-hidden">
      <div
        className="h-screen min-h-[560px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/90 via-navy-950/50 to-transparent">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <h1 className="max-w-2xl font-display text-3xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
            Seguridad privada para empresas en Celaya y el Bajío
          </h1>
          <a
            href="#contacto"
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-accent-500 px-8 py-3.5 font-semibold text-navy-950 shadow-lg transition duration-300 hover:bg-accent-400 sm:w-auto"
          >
            Solicitar cotización
          </a>
        </div>
      </div>
    </section>
  );
};
