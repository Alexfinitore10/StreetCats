import {Link} from "react-router-dom";
import { useAuth } from './AuthContext';
import { useState } from 'react';

function Navbar({ resetState }) {
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (err) {
      console.error('Errore durante il logout:', err);
    }
  };

  return (
    <nav className='z-50 main-container mx-4 my-4 px-6 py-4 relative'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <Link 
          to='/' 
          className='text-2xl font-bold text-[var(--text-dark)] hover:text-[var(--primary-blue)] transition-colors duration-300'
        >
          🐱 StreetCats
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-6'>
          {isLoggedIn && (
            <>
              <Link 
                to='/pubblica-post' 
                className='bg-[var(--primary-blue)] text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary-blue)] transition-colors duration-300 font-medium'
              >
                Crea Segnalazione
              </Link>
            </>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className='hidden md:flex items-center space-x-4'>
          {isLoggedIn ? (
            <div className='flex items-center space-x-4'>
              <Link 
                to='/cambia-password' 
                className='text-[var(--text-light)] hover:text-[var(--primary-blue)] transition-colors duration-300 text-sm'
              >
                Cambia password
              </Link>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium text-sm'
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to='/login' 
              className='bg-[var(--primary-blue)] text-white px-6 py-2 rounded-lg hover:bg-[var(--secondary-blue)] transition-colors duration-300 font-medium'
            >
              Log-in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1'
        >
          <span className={`w-6 h-0.5 bg-[var(--text-dark)] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[var(--text-dark)] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[var(--text-dark)] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
          <div className='flex flex-col py-4'>
            {isLoggedIn && (
              <>
                <hr className='my-2 mx-6' />
                <Link 
                  to='/creazione-utenza' 
                  className='px-6 py-3 text-[var(--text-dark)] hover:bg-gray-50 transition-colors duration-300'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Creazione Utenza
                </Link>
                <Link 
                  to='/pubblica-post' 
                  className='px-6 py-3 text-[var(--primary-blue)] font-medium hover:bg-gray-50 transition-colors duration-300'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Crea articolo
                </Link>
                <hr className='my-2 mx-6' />
                <Link 
                  to='/cambia-password' 
                  className='px-6 py-3 text-[var(--text-light)] hover:bg-gray-50 transition-colors duration-300 text-sm'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cambia password
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className='mx-6 my-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium text-sm text-left'
                >
                  Logout
                </button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <hr className='my-2 mx-6' />
                <Link 
                  to='/login' 
                  className='mx-6 my-2 bg-[var(--primary-blue)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary-blue)] transition-colors duration-300 font-medium text-center'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log-in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;