import { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, X } from 'lucide-react';
import { privacyContent } from '@/privacyContent';

const SOCIAL_LINKS = [
  {
    Icon: Facebook,
    url: 'https://www.facebook.com/argenta.risk.management',
    label: 'Facebook',
  },
  {
    Icon: Instagram,
    url: 'https://www.instagram.com/argentaseguridad',
    label: 'Instagram',
  },
  {
    Icon: Linkedin,
    url: 'https://www.linkedin.com/company/argenta-risk-management',
    label: 'LinkedIn',
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    if (!privacyOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPrivacyOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [privacyOpen]);

  useEffect(() => {
    const onOpenRequest = () => setPrivacyOpen(true);
    window.addEventListener('open-privacy-policy', onOpenRequest);
    return () =>
      window.removeEventListener('open-privacy-policy', onOpenRequest);
  }, []);

  return (
    <>
      <footer className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-row items-center justify-around gap-4">
            <div className="min-w-0">
              <div className="mb-6 flex items-center">
                <img
                  src="/images/Logo_oscuro.png"
                  alt="Sentinel"
                  className="h-12 w-auto max-w-full rounded-lg object-contain sm:h-14"
                />
              </div>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/10 p-2 transition duration-300 hover:bg-white/20"
                    aria-label={social.label}
                  >
                    <social.Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div id="marca-guanajuato" className="flex min-w-0 justify-end">
              <img
                src="/images/Marca_Guanajuato.png"
                alt="Marca Guanajuato"
                className="h-24 w-auto max-w-full object-contain sm:h-28"
              />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row">
            <p className="mb-4 text-white/80 md:mb-0">
              © {year} Argenta Risk Management. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center space-x-4">
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="text-white/80 transition duration-300 hover:text-white"
              >
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </footer>

      {privacyOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPrivacyOpen(false);
          }}
        >
          <section
            className="flex h-[min(90vh,800px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-policy-title"
          >
            <div className="flex items-center justify-between gap-4 border-b border-navy-100 bg-navy-900 px-5 py-4 text-white sm:px-6">
              <h2
                id="privacy-policy-title"
                className="text-lg font-bold sm:text-xl"
              >
                Política de Privacidad
              </h2>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar Política de Privacidad"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-5 py-6 sm:px-8 sm:py-8">
              <div className="mx-auto max-w-3xl space-y-3 text-[15px] leading-relaxed text-slate-700 sm:text-base">
                {privacyContent.map((para, idx) => {
                  if (para.empty) {
                    return <div key={idx} className="h-3" />;
                  }
                  if (para.heading) {
                    const sizeClass =
                      para.headingLevel <= 1
                        ? 'text-xl font-bold text-navy-900 sm:text-2xl'
                        : 'text-lg font-bold text-navy-800 sm:text-xl';
                    return (
                      <h3 key={idx} className={`pt-2 ${sizeClass}`}>
                        {para.text}
                      </h3>
                    );
                  }
                  if (para.bold) {
                    return (
                      <p key={idx} className="font-bold text-slate-900">
                        {para.text}
                      </p>
                    );
                  }
                  if (para.segments) {
                    return (
                      <p key={idx}>
                        {para.segments.map((seg, sidx) => (
                          <span
                            key={sidx}
                            className={
                              seg.bold ? 'font-bold text-slate-900' : ''
                            }
                          >
                            {seg.text}
                          </span>
                        ))}
                      </p>
                    );
                  }
                  return <p key={idx}>{para.text}</p>;
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
