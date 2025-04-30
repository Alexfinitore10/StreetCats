import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

function Navbar({resetState}){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/check_token', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        } else {
          console.error('Failed to check login status:', response.statusText);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

    return (
        <nav className='flex justify-between bg-[#93c0f7]'>
          <Link to='/' className=''>Logo</Link>
          <div className='p-5 space-x-4 '>
            <Link to='/home' onClick={() => {window.location.href = '/home';}}>Home</Link>
            <Link to='/about' >About</Link>
            <Link to='/contact'>Contact</Link>
            {isLoggedIn && <Link to='/creazione-utenza'>Creazione Utenza</Link>}
            {isLoggedIn && <Link to='/pubblica-articolo'>Crea articolo</Link>}
          </div>
          <div className='flex space-x-4'>
            {isLoggedIn ? (
              <button
              onClick={async () => {
                try {
                  const res = await fetch("http://localhost:3001/api/logout", {
                    method: "POST",
                    credentials: "include", // per inviare i cookie al backend
                  });
            
                  if (res.ok) {
                    setIsLoggedIn(false); // aggiorni lo stato
                    // opzionale: puoi fare anche un redirect
                    window.location.href = "/login";
                  }
                } catch (err) {
                  console.error("Errore durante il logout:", err);
                }
              }}
              className="text-red-600"
            >
              Logout
            </button>
            ) : (
              <Link to='/login' onClick={() => {window.location.href = '/login';}}>Log-in</Link>
            )}
          </div>
        </nav>
    );
}

export default Navbar;