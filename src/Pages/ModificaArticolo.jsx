import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-blue-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center bg-blue-100 p-4 rounded">Modifica Articolo</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-blue-100 p-4 rounded">
        <div>
          <label htmlFor="titolo" className="block text-sm font-medium text-gray-700">Titolo</label>
          <input
            type="text"
            id="titolo"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrizione</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="contenuto" className="block text-sm font-medium text-gray-700">Contenuto (Con supporto a Markdown)</label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="mb-2 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              {isPreview ? 'Modifica' : 'Anteprima'}
            </button>
          </div>
          {isPreview ? (
            <div className="prose prose-lg mt-1 p-4 border rounded-lg bg-gray-50">
              <ReactMarkdown>{contenuto}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              id="contenuto"
              value={contenuto}
              onChange={(e) => setContenuto(e.target.value)}
              rows="10"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          )}
        </div>

        <div>
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Data di Pubblicazione</label>
          <input
            type="date"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (separati da virgola)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Mappa per modificare la posizione */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Modifica la posizione sulla mappa</label>
          <MapContainer center={selectedPosition || position || [41.9028, 12.4964]} zoom={5} style={{ height: '300px', width: '100%' }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler />
            {(selectedPosition || position) && (
              <Marker position={selectedPosition || position}>
                <Popup>
                  <span>Nuova posizione selezionata:<br/>Lat: {(selectedPosition || position)[0].toFixed(5)}, Lng: {(selectedPosition || position)[1].toFixed(5)}</span>
                </Popup>
              </Marker>
            )}
          </MapContainer>
          <div className="mt-2">
            <span className="text-sm">
              Nuova posizione selezionata: {(selectedPosition || position) ? `${(selectedPosition || position)[0].toFixed(5)}, ${(selectedPosition || position)[1].toFixed(5)}` : 'Nessuna'}
            </span>
          </div>
        </div>

        <div>
          <button type="submit" className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Salva Modifiche
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModificaArticolo;