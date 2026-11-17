const ADS_ID = 'AW-18399262467';

// Etiquetas de conversión de Google Ads (créalas en Ads > Conversiones).
// Mientras estén vacías solo se envía el evento, sin conversión.
const LABELS = {
  form: 'NYEVCJHfhOkcEIPuucVE',
  whatsapp: '',
  phone: '',
} as const;

export function trackConversion(kind: keyof typeof LABELS, eventName: string) {
  window.gtag?.('event', eventName);
  const label = LABELS[kind];
  if (label) {
    window.gtag?.('event', 'conversion', { send_to: `${ADS_ID}/${label}` });
  }
}
