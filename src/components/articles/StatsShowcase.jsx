import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const StatsShowcase = () => {
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setStartCounting(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: 1250, label: 'Articles Published', suffix: '+' },
    { number: 42, label: 'Expert Writers', suffix: '+' },
    { number: 3.2, label: 'Monthly Readers', suffix: 'M' },
    { number: 95, label: 'Community Countries', suffix: '+' }
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Community in Numbers</h2>
          <p className="mt-4 text-xl text-gray-300">The impact we've made together</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-800 rounded-lg">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                {startCounting ? (
                  <CountUp 
                    end={stat.number} 
                    duration={2.5} 
                    decimals={stat.number % 1 !== 0 ? 1 : 0}
                    suffix={stat.suffix}
                  />
                ) : 0}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsShowcase;