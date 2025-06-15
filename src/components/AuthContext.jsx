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
      console.log('Chiamo /api/check_token per verificare il login...');
      try {
        const res = await fetch('http://localhost:3001/api/check_token', {
          credentials: 'include', // 🔥 invia cookie HttpOnly
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Risposta check_token:', data);
          setIsLoggedIn(true);
          setUser(data.user); // user deve arrivare dal backend come `req.user`
          if (data.user?.nome) {
            localStorage.setItem('nome_giornalista', data.user.nome); // salva solo il nome nel localStorage
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('nome_giornalista');
        }
      } catch (err) {
        console.error('Errore nel controllo del token:', err);
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('nome_giornalista');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  // Funzione per login manuale (es. dopo un form)
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    if (userData?.nome) {
      localStorage.setItem('nome_giornalista', userData.nome); // salva solo il nome
    }
  };

  // Funzione di logout manuale
  const logout = () => {
    fetch('http://localhost:3001/api/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('nome_giornalista');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook per usare il contesto
export const useAuth = () => useContext(AuthContext);
