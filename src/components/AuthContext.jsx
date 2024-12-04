import React, { createContext, useState, useContext } from 'react';

// Crea un contesto per l'autenticazione
const AuthContext = createContext();

// Provider per gestire lo stato di login
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Funzione per aggiornare lo stato di login
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook per utilizzare il contesto in modo più semplice
export const useAuth = () => useContext(AuthContext);
