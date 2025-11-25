import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatusBar from '../components/StatusBar';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import WhyChooseUs from '../components/WhyChooseUs';

const Home: React.FC = () => {
  return (
    <div id="home" className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100 selection:text-pink-900">
      <Navbar />
      <Hero />
      <StatusBar />
      <Pricing />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;