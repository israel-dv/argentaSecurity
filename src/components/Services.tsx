import { SERVICES } from '@/data';
import { useInView } from '@/hooks/useInView';

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
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md ring-1 ring-navy-900/5"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 lg:from-navy-950/80 lg:via-navy-900/20 lg:to-transparent lg:group-hover:from-navy-950/95 lg:group-hover:via-navy-950/80 lg:group-hover:to-navy-950/60 ${
          inView
            ? 'from-navy-950/95 via-navy-950/80 to-navy-950/60 lg:from-navy-950/80 lg:via-navy-900/20 lg:to-transparent'
            : 'from-navy-950/80 via-navy-900/20 to-transparent'
        } lg:group-hover:from-navy-950/95 lg:group-hover:via-navy-950/80 lg:group-hover:to-navy-950/60`}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="font-display text-xl font-bold text-white">{title}</h3>
        <div
          className={`grid transition-all duration-500 lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] ${
            inView
              ? 'grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]'
              : 'grid-rows-[0fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]'
          }`}
        >
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
              <p className="mt-3 text-sm leading-relaxed text-white/90">{description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/30" />
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="bg-navy-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold text-navy-900 sm:text-5xl">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-navy-700/70">
            Pasa el cursor sobre cada servicio para conocer los detalles.
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
