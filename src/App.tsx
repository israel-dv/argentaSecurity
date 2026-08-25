import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Strengths from '@/components/Strengths';
import Services from '@/components/Services';
import Different from '@/components/Different';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main>
        <Hero />
        <Strengths />
        <Services />
        <Different />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
