'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Cards from './cards';
import { motion } from 'motion/react';

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[80vh] w-full flex flex-col items-center justify-center h-screen px-4 overflow-visible"
    >
      <div className="space-y-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Analyze your building needs
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Analyze architectural drawings, construction plans, and design
          sketches with advanced AI technology. Get instant insights and
          detailed interpretations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            className="hover:opacity-90 transition-all duration-200  px-8 py-6 rounded-lg text-lg group w-full sm:w-auto"
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
    </motion.div>
  );
};

export default HeroSection;
