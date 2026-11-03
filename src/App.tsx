import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Strengths } from '@/components/Strengths';
import { Services } from '@/components/Services';
import { Different } from '@/components/Different';
import { Contact } from '@/components/Contact';
import { JobApplications } from '@/components/JobApplications';
import { Footer } from '@/components/Footer';
import { Telephone } from '@/components/Telephone';

const JOBS_PATH = '/bolsa-trabajo';

export default function App() {
  const isJobsPage = window.location.pathname.replace(/\/+$/, '') === JOBS_PATH;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Navbar solid={isJobsPage} />
      <main className="flex flex-1 flex-col">
        {isJobsPage ? (
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
