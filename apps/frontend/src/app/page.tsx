import { Header } from '../ui/Header';
import { Hero } from '../ui/Hero';
import { HowItWorks } from '../ui/HowItWorks';
import { Features } from '../ui/Features';
import { Architecture } from '../ui/Architecture';
import { UseCase } from '../ui/UseCase';
import { CTA } from '../ui/CTA';
import { Footer } from '../ui/Footer';

function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 -z-10 overflow-hidden">
      <div className="mx-auto h-80 max-w-5xl rounded-full bg-cyan/20 blur-3xl" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink text-cloud">
      <BackgroundGlow />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Architecture />
        <UseCase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
