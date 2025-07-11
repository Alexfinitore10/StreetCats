import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './NavBar';

function FrontPage() {
  const { isLoggedIn, user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/api/articles')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Errore fetch articoli:', error);
        setLoading(false);
      });
  }, []);

  // Filtra solo articoli con posizione valida
  const articlesWithPosition = articles.filter(
    a => Array.isArray(a.position) && a.position.length === 2 &&
      typeof a.position[0] === 'number' && typeof a.position[1] === 'number'
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-white main-title text-6xl md:text-7xl font-bold mb-4">
            🐱 StreetCats
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-medium">
            Scopri i gatti della tua città
          </p>
          <div className="w-24 h-1 bg-white/30 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="main-container p-6 md:p-8 fade-in">
          <div className="mb-6 flex justify-center">
            <h2 className=" text-4xl font-bold text-gray-800 mb-2">
              🗺️ Mappa Interattiva
            </h2>
          </div>

          {/* Map Container */}
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-16 z-10">
                <div className="text-center">
                  <div className="loading-spinner mx-auto mb-4"></div>
                  <p className="text-gray-600">Caricamento gatti...</p>
                </div>
              </div>
            )}
            
            <div 
              className="w-full rounded-16 overflow-hidden"
              style={{ height: '600px' }}
            >
              <MapContainer 
                center={[41.9028, 12.4964]} 
                zoom={6} 
                style={{ height: '100%', width: '100%' }} 
                scrollWheelZoom={true}
                className="rounded-16"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {articlesWithPosition.map(article => (
                  <Marker
                    key={article.id}
                    position={article.position}
                  >
                    <Popup maxWidth={200} className="custom-popup">
                      <div className="text-center p-2">
                        <img
                          className="popup-image mx-auto mb-3"
                          src={article.image}
                          alt={article.title}
                          style={{ 
                            width: '100px', 
                            height: '100px', 
                            objectFit: 'cover',
                            cursor: 'pointer'
                          }}
                          onClick={() => navigate(`/articolo/${article.id}`, { state: article })}
                        />
                        <h3
                          className="font-bold text-lg text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                          onClick={() => navigate(`/articolo/${article.id}`, { state: article })}
                        >
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Clicca per vedere i dettagli
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center mt-2">
            <div className="justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-2xl text-center mt-2 mx-auto">
              <div className="text-3xl font-bold">{articlesWithPosition.length}</div>
              <div className="text-blue-100">Gatti sulla mappa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;