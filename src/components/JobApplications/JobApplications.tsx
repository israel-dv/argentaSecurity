import { useEffect, useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
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

export const JobApplications = () => {
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

  const showError = (key: keyof JobState) =>
    touched[key] ? errors[key] : undefined;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, position: true, phone: true, email: true });
    if (Object.keys(errors).length > 0) return;
    fsSubmit(e);
  };

  const openPrivacy = () =>
    window.dispatchEvent(new CustomEvent('open-privacy-policy'));

  useEffect(() => {
    if (fsState.succeeded) {
      setJob({ name: '', position: '', phone: '', email: '' });
      setTouched({ name: false, position: false, phone: false, email: false });
    }
  }, [fsState.succeeded]);

  return (
    <section
      id="bolsa-de-trabajo"
      className="flex flex-1 items-center justify-center bg-white px-4 py-12 text-navy-900 sm:py-16"
    >
      <div className="w-full max-w-5xl">
        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-2xl border border-navy-100 bg-white p-6 shadow-xl shadow-navy-900/10 sm:p-8"
        >
          <h3 className="mb-6 text-2xl font-bold text-navy-900">
            Forma parte de nuestro equipo de trabajo
          </h3>
          <input type="hidden" name="mensaje" value="Solicitud de empleo" />
          <input
            type="hidden"
            name="_subject"
            value="Nueva solicitud de empleo"
          />
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <JobField label="Nombre" error={showError('name')}>
              <input
                type="text"
                name="nombre"
                maxLength={80}
                value={job.name}
                onChange={(e) => update('name', e.target.value)}
                onBlur={() => blur('name')}
                className="input"
                placeholder="Tu nombre completo"
                required
              />
              <ValidationError
                field="nombre"
                errors={fsState.errors}
                className="mt-1 text-sm text-red-600"
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
                className="input"
                placeholder="Puesto de interés"
                required
              />
              <ValidationError
                field="puesto"
                errors={fsState.errors}
                className="mt-1 text-sm text-red-600"
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
                className="input"
                placeholder="Tu número de teléfono"
                required
              />
              <ValidationError
                field="teléfono"
                errors={fsState.errors}
                className="mt-1 text-sm text-red-600"
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
                className="input"
                placeholder="tu@email.com"
                required
              />
              <ValidationError
                field="email"
                errors={fsState.errors}
                className="mt-1 text-sm text-red-600"
              />
            </JobField>
          </div>
          <button
            type="submit"
            disabled={fsState.submitting}
            className="flex items-center gap-2 rounded-md bg-navy-900 px-6 py-2 font-medium text-white transition duration-300 hover:bg-navy-800 disabled:opacity-70"
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
          {fsState.errors && fsState.errors.getFormErrors().length > 0 && (
            <p className="mt-4 text-sm text-red-600">
              No pudimos enviar tu solicitud. Inténtalo de nuevo.
            </p>
          )}
          {fsState.succeeded && (
            <p className="mt-4 text-sm text-navy-700">
              ¡Gracias! Hemos recibido tu solicitud.
            </p>
          )}

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            <strong className="font-bold text-slate-700">
              Aviso de Privacidad Simplificado:
            </strong>{' '}
            Argenta Risk Management, con domicilio en Celaya, Guanajuato,
            México, utilizará tus datos personales (nombre, correo, teléfono y
            empresa) de manera exclusiva para la evaluación de tu perfil en
            procesos de reclutamiento y selección de personal presentes o
            futuros. Tus datos son recolectados a través de la plataforma
            Formspree. Consulta el procedimiento para ejercer tus derechos ARCO
            en nuestro{' '}
            <button
              type="button"
              onClick={openPrivacy}
              className="font-medium text-navy-800 underline underline-offset-2 transition-colors hover:text-navy-950"
            >
              Aviso de Privacidad Integral
            </button>
            .
          </p>
        </form>
      </div>
    </section>
  );
};

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
      <label className="mb-2 block text-sm font-medium text-navy-800">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
