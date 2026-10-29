import { HERO_IMAGE } from '@/data';

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt=""
        loading="lazy"
        className="h-screen min-h-[560px] w-full object-cover object-center"
      />
    </section>
  );
}
