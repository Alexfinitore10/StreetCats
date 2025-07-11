import React, { useState } from 'react';
import NavBar from '../components/NavBar';

function CambiaPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:3001/api/change_password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setMessage('Password cambiata con successo!');
        setNewPassword('');
      } else {
        setMessage(data.message || 'Errore nel cambio password');
      }
    } catch (error) {
      setMessage('Errore di rete');
    }
  };

  return (
    <>
  <NavBar />
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-800 text-center">Cambia Password</h2>
      <form onSubmit={handleChangePassword} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="newPassword" className="block text-blue-800 font-medium">Nuova Password *</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-blue-300 rounded-xl placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Inserisci la nuova password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md"
        >
          Cambia password
        </button>
        {message && (
          <div className="mt-2 text-center text-red-600 font-medium">
            {message}
          </div>
        )}
      </form>
    </div>
  </div>
</>
  );
}

export default CambiaPassword;
