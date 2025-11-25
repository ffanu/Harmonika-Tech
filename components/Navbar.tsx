import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Keunggulan', path: '/keunggulan' },
    { label: 'Paket', path: '/paket' },
    { label: 'Testimoni', path: '/testimoni' },
    { label: 'Kontak', path: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                H
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Harmonika Tech</span>
                <span className="text-sm font-semibold text-gray-900 leading-tight">Internet yang selalu selaras</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.path} 
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin')}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Admin Login
            </button>
            <Link to="/kontak" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all transform hover:-translate-y-0.5">
              Minta Penawaran
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full px-4 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                to={item.path} 
                className={`text-base font-medium ${
                  isActive(item.path) ? 'text-purple-600' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button 
                onClick={() => navigate('/admin')}
                className="text-sm text-gray-500 text-left"
              >
                Admin Login
              </button>
              <Link to="/kontak" onClick={() => setIsOpen(false)} className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-center">
                Minta Penawaran
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;