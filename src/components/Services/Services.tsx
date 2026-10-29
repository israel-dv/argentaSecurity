import { SERVICES } from '@/data';

function ServiceCard({
  image,
  title,
  bullets,
  description,
}: {
  image: string;
  title: string;
  bullets?: string[];
  description?: string;
}) {
  return (
    <div className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-2xl shadow-md ring-1 ring-navy-900/5 [@media(hover:hover)_and_(min-width:1024px)]:block [@media(hover:hover)_and_(min-width:1024px)]:aspect-[3/4] [@media(hover:hover)_and_(min-width:1024px)]:min-h-0">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 [@media(hover:hover)_and_(min-width:1024px)]:group-hover:scale-110"
      />

      {/* Móvil o táctil: overlay oscuro fijo. Escritorio (mouse y ventana de 1024px o más): overlay ligero que se oscurece al hacer hover. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/80 to-navy-950/60 transition-colors duration-500 [@media(hover:hover)_and_(min-width:1024px)]:from-navy-950/80 [@media(hover:hover)_and_(min-width:1024px)]:via-navy-900/20 [@media(hover:hover)_and_(min-width:1024px)]:to-transparent [@media(hover:hover)_and_(min-width:1024px)]:group-hover:from-navy-950/95 [@media(hover:hover)_and_(min-width:1024px)]:group-hover:via-navy-950/80 [@media(hover:hover)_and_(min-width:1024px)]:group-hover:to-navy-950/60" />

      <div className="relative mt-auto flex flex-col p-6 [@media(hover:hover)_and_(min-width:1024px)]:absolute [@media(hover:hover)_and_(min-width:1024px)]:inset-0 [@media(hover:hover)_and_(min-width:1024px)]:mt-0 [@media(hover:hover)_and_(min-width:1024px)]:justify-end">
        <h3 className="font-display text-xl font-bold text-white">{title}</h3>

        {/* Móvil o táctil: siempre expandido. Escritorio: colapsado hasta hacer hover. */}
        <div className="grid grid-rows-[1fr] transition-all duration-500 [@media(hover:hover)_and_(min-width:1024px)]:grid-rows-[0fr] [@media(hover:hover)_and_(min-width:1024px)]:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            {bullets ? (
              <ol className="mt-3 space-y-2 text-sm leading-relaxed text-white/90">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-white">{i + 1}.</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-white/0 transition-all duration-500 [@media(hover:hover)_and_(min-width:1024px)]:group-hover:ring-white/30" />
    </div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="bg-navy-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold text-navy-900 sm:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-navy-700/70">
            <span className="[@media(hover:hover)_and_(min-width:1024px)]:hidden">
              Conoce los detalles de cada servicio.
            </span>
            <span className="hidden [@media(hover:hover)_and_(min-width:1024px)]:inline">
              Pasa el cursor sobre cada servicio para conocer los detalles.
            </span>
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.title}
              image={s.image}
              title={s.title}
              bullets={s.bullets}
              description={s.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
