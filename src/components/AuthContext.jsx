import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea un contesto per l'autenticazione
const AuthContext = createContext();

// Provider per gestire lo stato di login
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // di default false
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // per evitare flickering

  // Controlla se il token/cookie è valido al caricamento
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');

        if (storedUser && storedIsLoggedIn === 'true') {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
          setLoading(false);
          return;
        }

        const res = await fetch('/api/check_token', {
          credentials: 'include', // 🔥 invia cookie HttpOnly
        });

        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(true);
          localStorage.setItem('nome_giornalista', data.giornalista.nome); // salva il nome nel local storage
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('isLoggedIn', 'true');
          setUser(data.user); // user deve arrivare dal backend come `req.user`
        } else {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('isLoggedIn');
        }
      } catch (err) {
        console.error('Errore nel controllo del token:', err);
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  // Funzione per login manuale (es. dopo un form)
  const login = (userData) => {
    console.log('Login function called with:', userData); // Log aggiunto
    setIsLoggedIn(true);
    setUser(userData);
    console.log('isLoggedIn updated to:', true); // Log aggiunto
    console.log('User updated to:', userData); // Log aggiunto
  };

  // Funzione di logout manuale
  const logout = () => {
    // Se vuoi anche chiamare un endpoint /logout, puoi farlo qui
    fetch('/api/logout', { credentials: 'include' }).catch(() => {});
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook per usare il contesto
export const useAuth = () => useContext(AuthContext);
