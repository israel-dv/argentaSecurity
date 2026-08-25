import { useEffect, useState } from 'react';
import { MapPin, Mail, Send, Loader2 } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { CONTACT_INFO } from '@/data';
import { useReveal } from '@/hooks/useReveal';

const ICONS: Record<string, typeof MapPin> = { MapPin, Mail };

type FormState = {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+()-]{7,20}$/;
const NAME_RE = /^[\p{L}\s'.-]{2,80}$/u;

function validate(form: FormState): Errors {
  const errors: Errors = {};

  if (!form.name.trim()) {
    errors.name = 'Ingresa tu nombre.';
  } else if (!NAME_RE.test(form.name)) {
    errors.name = 'El nombre solo puede contener letras y espacios.';
  }

  if (!form.email.trim()) {
    errors.email = 'Ingresa tu correo electrónico.';
  } else if (!EMAIL_RE.test(form.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (form.phone && !PHONE_RE.test(form.phone)) {
    errors.phone = 'Ingresa un teléfono válido (7 a 20 dígitos).';
  }

  if (form.location && form.location.trim().length > 80) {
    errors.location = 'El lugar no puede exceder 80 caracteres.';
  }

  if (!form.message.trim()) {
    errors.message = 'Cuéntanos en qué podemos ayudarte.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  } else if (form.message.length > 1000) {
    errors.message = 'El mensaje no puede exceder 1000 caracteres.';
  }

  return errors;
}

export default function Contact() {
  const formRef = useReveal<HTMLFormElement>();
  const infoRef = useReveal<HTMLDivElement>();
  const [fsState, fsSubmit] = useForm('xeajdoae');
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    phone: false,
    location: false,
    message: false,
  });
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });

  const errors = validate(form);

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const blur = (key: keyof FormState) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const showError = (key: keyof FormState) => touched[key] && errors[key];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, location: true, message: true });
    if (Object.keys(errors).length > 0) return;
    fsSubmit(e);
  };

  useEffect(() => {
    if (fsState.succeeded) {
      setForm({ name: '', email: '', phone: '', location: '', message: '' });
      setTouched({ name: false, email: false, phone: false, location: false, message: false });
    }
  }, [fsState.succeeded]);

  return (
    <section id="contacto" className="bg-navy-50/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
            Contáctanos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <form
            ref={formRef.ref}
            onSubmit={onSubmit}
            noValidate
            className={`rounded-lg bg-white p-8 shadow-lg transition duration-700 ease-out ${
              formRef.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h3 className="mb-6 font-display text-2xl font-bold text-navy-900">
              Estamos para ayudarte
            </h3>

            <input type="hidden" name="_subject" value="Nuevo mensaje de Contacto" />

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Nombre" required error={showError('name')}>
                <input
                  required
                  type="text"
                  name="nombre"
                  maxLength={80}
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  onBlur={() => blur('name')}
                  className="argenta-input"
                  placeholder="Tu nombre completo"
                />
                <ValidationError
                  field="nombre"
                  errors={fsState.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </Field>
              <Field label="Correo electrónico" required error={showError('email')}>
                <input
                  required
                  type="email"
                  name="correo"
                  maxLength={120}
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  onBlur={() => blur('email')}
                  className="argenta-input"
                  placeholder="nombre@correo.com"
                />
                <ValidationError
                  field="correo"
                  errors={fsState.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </Field>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Teléfono" error={showError('phone')}>
                <input
                  type="tel"
                  name="teléfono"
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  onBlur={() => blur('phone')}
                  className="argenta-input"
                  placeholder="Opcional"
                />
                <ValidationError
                  field="teléfono"
                  errors={fsState.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </Field>
              <Field label="¿De dónde nos escribes?" error={showError('location')}>
                <input
                  type="text"
                  name="ubicación"
                  maxLength={80}
                  value={form.location}
                  onChange={(e) => update('location', e.target.value)}
                  onBlur={() => blur('location')}
                  className="argenta-input"
                  placeholder="Opcional"
                />
                <ValidationError
                  field="ubicación"
                  errors={fsState.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </Field>
            </div>

            <div className="mb-6">
              <Field label="Tu mensaje (servicio de interés)" required error={showError('message')}>
                <textarea
                  required
                  name="mensaje"
                  rows={5}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  onBlur={() => blur('message')}
                  className="argenta-input resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte"
                />
                <ValidationError
                  field="mensaje"
                  errors={fsState.errors}
                  className="mt-1 text-sm text-red-600"
                />
              </Field>
            </div>

            {fsState.errors && fsState.errors.length > 0 && (
              <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                No pudimos enviar tu mensaje. Inténtalo de nuevo.
              </p>
            )}

            <button
              type="submit"
              disabled={fsState.submitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-navy-900 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-navy-800 disabled:opacity-70"
            >
              {fsState.submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar <Send className="h-5 w-5" />
                </>
              )}
            </button>

            {fsState.succeeded && (
              <div className="mt-4 rounded-md bg-green-100 px-4 py-3 text-green-800">
                ¡Gracias por tu mensaje! Te contactaremos pronto.
              </div>
            )}

            <p className="mt-5 text-xs leading-relaxed text-gray-500">
              <strong className="font-bold text-gray-600">Aviso de Privacidad Simplificado:</strong>{' '}
              Argenta Risk Management, con domicilio en Celaya, Guanajuato, México, utilizará tus datos
              personales (nombre, correo, teléfono y empresa) para atender tus solicitudes de
              información, cotizaciones y dar seguimiento comercial. Tus datos se procesan de forma
              segura mediante nuestro encargado técnico Formspree. Para conocer más sobre el
              tratamiento de tus datos y cómo ejercer tus derechos ARCO, consulta nuestro{' '}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-privacy-policy'))}
                className="font-medium text-navy-700 underline underline-offset-2 transition-colors hover:text-navy-900"
              >
                Aviso de Privacidad Integral
              </button>
              .
            </p>
          </form>

          <div
            ref={infoRef.ref}
            className={`transition duration-700 ease-out ${
              infoRef.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex h-full flex-col rounded-lg bg-navy-900 p-8 text-white shadow-lg">
              <h3 className="mb-6 font-display text-2xl font-bold">Medios de contacto</h3>
              <p className="mb-8">
                Nuestros expertos en gestión de riesgos atenderán tus requerimientos para
                proporcionar soluciones adaptadas a tus necesidades.
              </p>
              <div className="mb-auto space-y-6">
                {CONTACT_INFO.map((c) => {
                  const Icon = ICONS[c.icon] ?? Mail;
                  return (
                    <div key={c.label} className="flex items-start">
                      <div className="mr-4 rounded-full bg-white/10 p-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="mb-1 text-lg font-semibold">{c.label}</h4>
                        <p className="break-all text-white/80 sm:break-normal">{c.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
