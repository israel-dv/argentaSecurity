import { HERO_IMAGE } from '@/data';

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full overflow-hidden">
      <div
        className="h-screen min-h-[560px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
    </section>
  );
}
