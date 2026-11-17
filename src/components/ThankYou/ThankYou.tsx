import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { trackConversion } from '@/lib/analytics';

export default function ThankYou() {
  useEffect(() => {
    trackConversion('form', 'generate_lead');
  }, []);

  return (
    <section className="flex flex-1 items-center bg-navy-50/40 px-4 pb-20 pt-36">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-10 text-center shadow-lg">
        <CheckCircle className="mx-auto h-14 w-14 text-accent-500" />
        <h1 className="mt-6 font-display text-3xl font-bold text-navy-900">
          ¡Gracias!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Hemos recibido tu mensaje y te contactaremos pronto.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex rounded-md bg-navy-900 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-navy-800"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}
