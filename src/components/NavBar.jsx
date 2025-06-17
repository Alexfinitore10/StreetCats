import {Link} from "react-router-dom";
import { useAuth } from './AuthContext';

function Navbar({ resetState }) {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className='flex justify-between bg-[#93c0f7]'>
      <Link to='/' className=''>Logo</Link>
      <div className='p-5 space-x-4 '>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        {isLoggedIn && <Link to='/creazione-utenza'>Creazione Utenza</Link>}
        {isLoggedIn && <Link to='/pubblica-post'>Crea articolo</Link>}
      </div>
      <div className='flex space-x-4 flex-col items-end'>
        {isLoggedIn ? (
          <>
            <button
              onClick={async () => {
                try {
                  await logout();
                  window.location.href = '/login';
                } catch (err) {
                  console.error('Errore durante il logout:', err);
                }
              }}
              className='text-red-600'
            >
              Logout
            </button>
            <Link to='/cambia-password' className='text-blue-700 hover:underline mt-2'>Cambia password</Link>
          </>
        ) : (
          <Link to='/login'>Log-in</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;