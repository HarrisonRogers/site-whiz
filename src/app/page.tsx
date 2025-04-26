import Footer from '@/components/pages/homePage/footer';
import HeroSection from '@/components/pages/homePage/heroSection';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Link href="https://github.com/HarrisonRogers/site-whiz" target="_blank">
        <Image
          src={Logo}
          alt="Site Whiz logo"
          width={32}
          height={32}
          className="absolute top-2 left-4 size-10"
        />
      </Link>
      <HeroSection />
      <Footer />
    </div>
  );
}
