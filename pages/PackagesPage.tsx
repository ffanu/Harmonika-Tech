import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';

const PackagesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Contact />
    </div>
  );
};

export default PackagesPage;