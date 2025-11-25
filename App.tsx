import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { ChatProvider } from './context/ChatContext';
import Home from './pages/Home';
import PackagesPage from './pages/PackagesPage';
import FeaturesPage from './pages/FeaturesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LiveChatWidget from './components/LiveChatWidget';

const App: React.FC = () => {
  return (
    <ContentProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/keunggulan" element={<FeaturesPage />} />
            <Route path="/paket" element={<PackagesPage />} />
            <Route path="/testimoni" element={<TestimonialsPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          <LiveChatWidget />
        </Router>
      </ChatProvider>
    </ContentProvider>
  );
};

export default App;