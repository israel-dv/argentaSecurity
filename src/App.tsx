import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Strengths } from '@/components/Strengths';
import { Services } from '@/components/Services';
import { Different } from '@/components/Different';
import { Contact } from '@/components/Contact';
import { JobApplications } from '@/components/JobApplications';
import { Footer } from '@/components/Footer';
import { ThankYou } from '@/components/ThankYou';
import { Telephone } from '@/components/Telephone';

const JOBS_PATH = '/bolsa-trabajo';
const THANKS_PATH = '/gracias';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const isJobsPage = path === JOBS_PATH;
  const isThanksPage = path === THANKS_PATH;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Navbar solid={isJobsPage || isThanksPage} />
      <main className="flex flex-1 flex-col">
        {isThanksPage ? (
          <ThankYou />
        ) : isJobsPage ? (
          <JobApplications />
        ) : (
          <>
            <Hero />
            <Strengths />
            <Services />
            <Different />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <Telephone />
    </div>
  );
}
