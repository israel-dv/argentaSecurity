import { DIFFERENCES } from '@/data';
import { useReveal } from '@/hooks/useReveal';

export default function Different() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="diferencia" className="bg-gray-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold text-navy-900 sm:text-5xl whitespace-normal sm:whitespace-nowrap">
            ¿Qué hace diferente
            <br className="sm:hidden" /> a Argenta?
          </h2>
        </div>

        <div
          ref={ref}
          className={`mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 reveal ${
            visible ? 'is-visible' : ''
          }`}
        >
          {DIFFERENCES.map((d) => (
            <div
              key={d.title}
              className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:border-navy-300 hover:shadow-xl"
            >
              <div className="flex justify-center">
                <img
                  src={d.image}
                  alt={d.title}
                  className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-5 text-center font-display text-lg font-bold text-navy-900">{d.title}</h3>
              <p className="mt-2 text-justify text-sm leading-relaxed text-gray-600">{d.text}</p>
              {d.bullets && (
                <ol className="mt-3 space-y-2 text-justify text-sm leading-relaxed text-gray-600">
                  {d.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-semibold text-navy-700">{i + 1}.</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
