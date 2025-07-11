import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Navbar from '../components/NavBar';

function ModificaArticolo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [titolo, setTitolo] = useState('');
  const [contenuto, setContenuto] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [article, setArticle] = useState(null);
  const [position, setPosition] = useState(null); // Stato posizione
  const [selectedPosition, setSelectedPosition] = useState(null); // Per la posizione scelta sulla mappa

  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Location completa:', location);
    console.log('id dell\'articolo:', location.state ? location.state.id : 'Nessun ID'); // Debug log
    // Debug log
    if (location.state) {
      setArticle(location.state.id);
      setTitolo(location.state.title);
      setContenuto(location.state.contenuto);
      setDescription(location.state.description);
      setTags(Array.isArray(location.state.tags) ? location.state.tags.join(',') : location.state.tags);
      setPublishedDate(location.state.publishedDate);
      if (Array.isArray(location.state.position) && location.state.position.length === 2) {
        setPosition(location.state.position);
      }
    } else {
      console.log('Nessun dato articolo trovato in location.state'); // Debug log
      alert('Errore: dati dell\'articolo non trovati');
      navigate('/home');
    }
  }, [location.state]);

  // Gestore click sulla mappa
  function handleMapClick(e) {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  }
  function ClickHandler() {
    useMap().on('click', handleMapClick);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: article,
      title: titolo,
      description,
      contenuto,
      tags: tags.split(','),
      publishedDate,
      position: JSON.stringify(selectedPosition || position) // Invia la posizione aggiornata
    };

    try {
      const response = await fetch(`http://localhost:3001/api/articles/modifyarticle/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Articolo modificato con successo!');
        navigate('/home');
        //window.location.reload(); // Refresh della pagina
      } else {
        const errorData = await response.json();
        alert(`Errore durante la modifica dell'articolo: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Errore durante la modifica:', error);
      alert('Errore durante la modifica dell\'articolo');
    }
  };

  if (!article) {
    return <div>Caricamento...</div>;
  }

  return (
      <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br to-blue-700 p-6">
        <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-300/40 p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-blue-800 text-center">Modifica Articolo</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="titolo" className="block text-blue-800 font-medium">Titolo *</label>
              <input id="titolo" type="text" value={titolo} onChange={e => setTitolo(e.target.value)} required className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="Titolo articolo" />
            </div>
    
            <div className="space-y-1">
              <label htmlFor="description" className="block text-blue-800 font-medium">Descrizione *</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} required className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="Una breve descrizione" />
            </div>
    
            <div className="space-y-1">
              <label htmlFor="contenuto" className="block text-blue-800 font-medium">Contenuto (con supporto a Markdown) *</label>
              <div className="flex justify-end">
                <button type="button" onClick={() => setIsPreview(!isPreview)} className="px-3 py-1 text-sm bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300 transition">{isPreview ? 'Modifica' : 'Anteprima Markdown'}</button>
              </div>
              {isPreview ? (
                <div className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                  <ReactMarkdown>{contenuto}</ReactMarkdown>
                </div>
              ) : (
                <textarea id="contenuto" value={contenuto} onChange={e => setContenuto(e.target.value)} rows={6} required className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="Scrivi qui il contenuto in Markdown..." />
              )}
            </div>
    
            <div className="space-y-1">
              <label htmlFor="publishedDate" className="block text-blue-800 font-medium">Data di Pubblicazione *</label>
              <input id="publishedDate" type="date" value={publishedDate} onChange={e => setPublishedDate(e.target.value)} required className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" />
            </div>
    
            <div className="space-y-1">
              <label htmlFor="tags" className="block text-blue-800 font-medium">Tags (separati da virgola) *</label>
              <input id="tags" type="text" value={tags} onChange={e => setTags(e.target.value)} required className="    w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="es. gatto, randagio, simpatico" />
            </div>
            <div className="space-y-1">
              <label className="block text-blue-800 font-medium">Modifica la posizione sulla mappa</label>
              <div className="w-full h-64 border border-blue-300 rounded-xl overflow-hidden">
                <MapContainer center={selectedPosition || position} zoom={5} className="h-full w-full">
                  <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <ClickHandler />
                  {(selectedPosition || position) && (
                    <Marker position={selectedPosition || position}>
                      <Popup>Lat: {(selectedPosition || position)[0].toFixed(5)}, Lng: {(selectedPosition || position)[1].toFixed(5)}</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>
    
            <button type="submit" className="w-full flex justify-center py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-md">Salva Modifiche</button>
          </form>
        </div>
      </div>
    </>
    );
}

export default ModificaArticolo;