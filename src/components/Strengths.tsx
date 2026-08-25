import { useReveal } from '@/hooks/useReveal';

export default function Strengths() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const imgReveal = useReveal<HTMLDivElement>();

  return (
    <section
      id="fortalezas"
      className="relative overflow-hidden bg-navy-900 py-24"
    >
      <img
        src="/images/Oficinas.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy-950/80" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Fortalezas que te dan tranquilidad
          </h2>
        </div>

        <div
          ref={ref}
          className={`mt-16 flex flex-col items-center reveal ${
            visible ? 'is-visible' : ''
          }`}
        >
          <div
            ref={imgReveal.ref}
            className={`w-full max-w-md overflow-hidden rounded-2xl shadow-2xl reveal-img ${
              imgReveal.visible ? 'is-visible' : ''
            }`}
          >
            <img
              src="/images/Cliente_.png"
              alt="Atención al cliente"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-6 max-w-2xl text-center text-xl leading-relaxed text-white/85">
            Nuestro objetivo es que dediques tu tiempo en la toma de decisiones
            estratégicas y atención a tus clientes internos.
          </p>
          <p className="mt-3 max-w-2xl text-center text-xl leading-relaxed text-white/85">
            Nosotros nos encargamos de prevenir los riesgos operativos y en
            darte una atención de calidad.
          </p>
        </div>
      </div>
    </section>
  );
}
