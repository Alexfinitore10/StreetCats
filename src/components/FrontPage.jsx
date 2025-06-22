import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './NavBar';

function FrontPage() {
  const { isLoggedIn, user } = useAuth();
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Errore fetch articoli:', error));
  }, []);

  // Filtra solo articoli con posizione valida (array di 2 numeri)
  const articlesWithPosition = articles.filter(
    a => Array.isArray(a.position) && a.position.length === 2 &&
      typeof a.position[0] === 'number' && typeof a.position[1] === 'number'
  );

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-4 mb-8 w-full">
      <h1 className="text-5xl font-bold mb-6 text-center">
        StreetCats: Mappa dei Gatti
      </h1>
      <div className="w-full max-w-4xl mx-auto" style={{ height: '600px' }}>
        <MapContainer center={[41.9028, 12.4964]} zoom={5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {articlesWithPosition.map(article => (
            <Marker
              key={article.id}
              position={article.position}
            >
              <Popup>
                <div className="text-center">
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', margin: '0 auto' }}
                    onClick={() => navigate(`/articolo/${article.id}`, { state: article })}
                  />
                  <div
                    className="font-bold text-lg mt-2 cursor-pointer hover:underline"
                    onClick={() => navigate(`/articolo/${article.id}`, { state: article })}
                  >
                    {article.title}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-6 text-gray-600 text-center">
        {articlesWithPosition.length === 0 && 'Nessun gatto con posizione sulla mappa.'}
      </div>
    </div>
  );
}

export default FrontPage;