import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Cards from './cards';

const HeroSection = () => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 overflow-visible">
      <div className="space-y-8 text-center max-w-4xl mx-auto">
        <h1 className="animate-fade-in text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 ">
          Intelligent Building Plan Analysis
        </h1>
        <p className="animate-fade-in animation-delay-150 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Analyze architectural drawings, construction plans, and design
          sketches with advanced AI technology. Get instant insights and
          detailed interpretations.
        </p>
        <div className="animate-fade-in animation-delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-all duration-200 text-white px-8 py-6 rounded-lg text-lg group w-full sm:w-auto"
            asChild
          >
            <Link href="/chat">
              <span className="flex items-center">
                Analyze Plans
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default HeroSection;
