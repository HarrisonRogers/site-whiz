import Footer from '@/components/pages/homePage/footer';
import HeroSection from '@/components/pages/homePage/heroSection';
import Logo from '@/components/logo';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Link href="https://github.com/HarrisonRogers/site-whiz" target="_blank">
        <Logo />
      </Link>
      <HeroSection />
      <Footer />
    </div>
  );
}
