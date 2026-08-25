import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#diferencia' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Bolsa de Trabajo', href: '#bolsa-de-trabajo' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-navy-950/30 py-3'
          : 'bg-gradient-to-b from-navy-950/60 to-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#inicio" className="flex items-center gap-2.5 text-white">
          <img
            src="/images/Logo.jpg"
            alt="Sentinel"
            className="h-10 w-auto max-w-[180px] rounded-lg object-contain sm:h-12"
          />
        </a>

        <span className="hidden lg:block text-base font-bold tracking-wide text-white sm:text-lg">
          Seguridad Privada
        </span>

        <div className={`hidden lg:block h-8 w-px bg-white/25 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <ul className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-xl font-extrabold text-navy-50/90 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden">
          <ul className="mx-6 mt-3 space-y-1 rounded-xl bg-navy-900 p-4 shadow-2xl">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3.5 text-lg font-bold text-navy-50 transition-colors hover:bg-white/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
