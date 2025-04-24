import React from 'react';

function Cards() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 animate-fade-in animation-delay-500 w-full max-w-7xl mx-auto">
      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
          Building Plans
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Analyze architectural blueprints and construction documents with
          precision
        </p>
      </div>
      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">
          Design Drawings
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Interpret interior and exterior design sketches efficiently
        </p>
      </div>
      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-400">
          Technical Specs
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Review technical specifications and mechanical layouts
        </p>
      </div>
    </div>
  );
}

export default Cards;
