import { useEffect, useState } from 'react';
import { Facebook, Instagram, Linkedin, Send, Loader2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

type JobState = {
  name: string;
  position: string;
  phone: string;
  email: string;
};

type Errors = Partial<Record<keyof JobState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+()-]{7,20}$/;
const NAME_RE = /^[\p{L}\s'.-]{2,80}$/u;

function validate(job: JobState): Errors {
  const errors: Errors = {};

  if (!job.name.trim()) {
    errors.name = 'Ingresa tu nombre.';
  } else if (!NAME_RE.test(job.name)) {
    errors.name = 'El nombre solo puede contener letras y espacios.';
  }

  if (!job.position.trim()) {
    errors.position = 'Ingresa el puesto de interés.';
  } else if (job.position.trim().length > 80) {
    errors.position = 'El puesto no puede exceder 80 caracteres.';
  }

  if (!job.phone.trim()) {
    errors.phone = 'Ingresa tu teléfono.';
  } else if (!PHONE_RE.test(job.phone)) {
    errors.phone = 'Ingresa un teléfono válido (7 a 20 dígitos).';
  }

  if (!job.email.trim()) {
    errors.email = 'Ingresa tu correo electrónico.';
  } else if (!EMAIL_RE.test(job.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  return errors;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [fsState, fsSubmit] = useForm('xwlezplr');
  const [touched, setTouched] = useState<Record<keyof JobState, boolean>>({
    name: false,
    position: false,
    phone: false,
    email: false,
  });
  const [job, setJob] = useState<JobState>({
    name: '',
    position: '',
    phone: '',
    email: '',
  });

  const errors = validate(job);

  const update = (key: keyof JobState, value: string) =>
    setJob((j) => ({ ...j, [key]: value }));

  const blur = (key: keyof JobState) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const showError = (key: keyof JobState) => touched[key] && errors[key];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, position: true, phone: true, email: true });
    if (Object.keys(errors).length > 0) return;
    fsSubmit(e);
  };

  useEffect(() => {
    if (fsState.succeeded) {
      setJob({ name: '', position: '', phone: '', email: '' });
      setTouched({ name: false, position: false, phone: false, email: false });
    }
  }, [fsState.succeeded]);

  return (
    <footer id="bolsa-de-trabajo" className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center">
              <img
                src="/images/Logo_oscuro.png"
                alt="Sentinel"
                className="h-12 w-auto rounded-lg sm:h-14"
              />
            </div>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full bg-white/10 p-2 transition duration-300 hover:bg-white/20"
                  aria-label="Red social"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-lg bg-white/10 p-6"
            >
              <h3 className="mb-6 text-xl font-bold text-white">
                Forma parte de nuestro equipo de trabajo
              </h3>
              <input type="hidden" name="mensaje" value="Solicitud de empleo" />
              <input type="hidden" name="_subject" value="Nueva solicitud de empleo" />
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <JobField label="Nombre" error={showError('name')}>
                  <input
                    type="text"
                    name="nombre"
                    maxLength={80}
                    value={job.name}
                    onChange={(e) => update('name', e.target.value)}
                    onBlur={() => blur('name')}
                    className="argenta-job-input"
                    placeholder="Tu nombre completo"
                    required
                  />
                  <ValidationError
                    field="nombre"
                    errors={fsState.errors}
                    className="mt-1 text-sm text-red-300"
                  />
                </JobField>
                <JobField label="Puesto" error={showError('position')}>
                  <input
                    type="text"
                    name="puesto"
                    maxLength={80}
                    value={job.position}
                    onChange={(e) => update('position', e.target.value)}
                    onBlur={() => blur('position')}
                    className="argenta-job-input"
                    placeholder="Puesto de interés"
                    required
                  />
                  <ValidationError
                    field="puesto"
                    errors={fsState.errors}
                    className="mt-1 text-sm text-red-300"
                  />
                </JobField>
                <JobField label="Teléfono" error={showError('phone')}>
                  <input
                    type="tel"
                    name="teléfono"
                    maxLength={20}
                    value={job.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    onBlur={() => blur('phone')}
                    className="argenta-job-input"
                    placeholder="Tu número de teléfono"
                    required
                  />
                  <ValidationError
                    field="teléfono"
                    errors={fsState.errors}
                    className="mt-1 text-sm text-red-300"
                  />
                </JobField>
                <JobField label="Correo electrónico" error={showError('email')}>
                  <input
                    type="email"
                    name="email"
                    maxLength={120}
                    value={job.email}
                    onChange={(e) => update('email', e.target.value)}
                    onBlur={() => blur('email')}
                    className="argenta-job-input"
                    placeholder="tu@email.com"
                    required
                  />
                  <ValidationError
                    field="email"
                    errors={fsState.errors}
                    className="mt-1 text-sm text-red-300"
                  />
                </JobField>
              </div>
              <button
                type="submit"
                disabled={fsState.submitting}
                className="flex items-center gap-2 rounded-md bg-white px-6 py-2 font-medium text-navy-900 transition duration-300 hover:bg-white/90 disabled:opacity-70"
              >
                {fsState.submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    Enviar solicitud <Send className="h-4 w-4" />
                  </>
                )}
              </button>
              {fsState.errors && fsState.errors.length > 0 && (
                <p className="mt-4 text-sm text-red-300">
                  No pudimos enviar tu solicitud. Inténtalo de nuevo.
                </p>
              )}
              {fsState.succeeded && (
                <p className="mt-4 text-sm text-white/80">
                  ¡Gracias! Hemos recibido tu solicitud.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/20 pt-8 md:flex-row">
          <p className="mb-4 text-white/80 md:mb-0">
            © {year} Argenta Risk Management. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <a href="#" className="text-white/80 transition duration-300 hover:text-white">
              Política de Privacidad
            </a>
            <a href="#" className="text-white/80 transition duration-300 hover:text-white">
              Términos de Servicio
            </a>
            <a href="#" className="text-white/80 transition duration-300 hover:text-white">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function JobField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/90">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
}
