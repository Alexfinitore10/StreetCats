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
      <div className="max-w-md mx-auto mt-10 p-6 bg-blue-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center bg-blue-100 p-4 rounded">Cambia Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4 bg-blue-100 p-4 rounded">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nuova Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cambia password
          </button>
          {message && <div className="mt-2 text-center text-red-600">{message}</div>}
        </form>
      </div>
    </>
  );
}

export default CambiaPassword;
