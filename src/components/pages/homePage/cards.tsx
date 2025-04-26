import { cn } from '@/lib/utils';
import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { MdEngineering } from 'react-icons/md';

type CardProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
  h3ClassName?: string;
  pClassName?: string;
};

const Card = ({
  title,
  description,
  className,
  h3ClassName,
  pClassName,
}: CardProps) => {
  return (
    <div
      className={cn(
        'p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-800 hover:scale-105 transition-all duration-300',
        className
      )}
    >
      <h3 className={cn('text-xl font-semibold mb-2', h3ClassName)}>{title}</h3>
      <p className={cn('text-gray-600 dark:text-gray-300', pClassName)}>
        {description}
      </p>
    </div>
  );
};

function Cards() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 w-full max-w-7xl mx-auto">
      <Card
        title={
          <div className="flex items-center gap-2">
            <FaHouse />
            Building Plans
          </div>
        }
        description="Analyze architectural blueprints and construction documents with precision"
      />
      <Card
        title={
          <div className="flex items-center gap-2">
            <FaPencilAlt />
            Design Drawings
          </div>
        }
        description="Interpret interior and exterior design sketches efficiently"
      />
      <Card
        title={
          <div className="flex items-center gap-2">
            <MdEngineering />
            Technical Specs
          </div>
        }
        description="Review technical specifications and mechanical layouts"
      />
    </div>
  );
}

export default Cards;
