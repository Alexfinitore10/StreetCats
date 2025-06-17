import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function CreaArticoloComp() {
  const [titolo, setTitolo] = useState('');
  const [contenuto, setContenuto] = useState('');
  const [immagineCopertina, setImmagineCopertina] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPreview, setIsPreview] = useState(false);
  const [position, setPosition] = useState([41.9028, 12.4964]); // Posizione predefinita (Roma)
  // Stato per la posizione temporanea selezionata sulla mappa
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aggiorna la posizione con l'ultima selezionata, se presente
    const finalPosition = selectedPosition || position;
    setPosition(finalPosition);

    // Preparazione dei dati da inviare al backend
    const formData = new FormData();
    formData.append('title', titolo);
    formData.append('description', description);
    formData.append('publishedDate', publishedDate);
    formData.append('contenuto', contenuto);
    if (immagineCopertina) {
      formData.append('image', immagineCopertina);
    }
    formData.append('tags', tags.split(','));
    formData.append('position', JSON.stringify(finalPosition));

    console.log('Dati articolo:', {
      title: titolo,
      description: description,
      contenuto: contenuto,
      image: immagineCopertina ? immagineCopertina.name : null,
      publishedDate: publishedDate,
      tags: tags,
      position: position
    });
    console.log('Invio posizione al backend:', finalPosition, JSON.stringify(finalPosition));

    // Esempio di invio dei dati al backend
    try {
      const response = await fetch('http://localhost:3001/api/article', {
        method: 'POST',
        credentials: 'include', // Invia automaticamente i cookie HTTP-only
        body: formData,
      });

      console.log('Response status:', response.status); // Log dello stato della risposta
      console.log('Response body:', await response.text()); // Log del corpo della risposta

      if (response.ok) {
        alert('Articolo creato con successo!');
        // Resetta i campi
        setTitolo('');
        setContenuto('');
        setImmagineCopertina(null);
        setDescription('');
        setTags('');
        setPublishedDate(new Date().toISOString().split('T')[0]);
        setPosition([41.9028, 12.4964]); // Resetta la posizione a Roma
      } else {
        const errorData = await response.json();
        alert(`Errore nella creazione dell'articolo: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
      alert('Errore durante l\'invio dei dati');
    }
  };

  // Funzione per gestire il click sulla mappa
  function handleMapClick(e) {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  }

  // Componente per gestire il click sulla mappa
  function ClickHandler() {
    useMap().on('click', handleMapClick);
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-blue-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center bg-blue-100 p-4 rounded">Crea un Nuovo Articolo</h2>
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
          <label htmlFor="immagineCopertina" className="block text-sm font-medium text-gray-700">Immagine di Copertina</label>
          <input
            type="file"
            id="immagineCopertina"
            onChange={(e) => setImmagineCopertina(e.target.files[0])}
            className="mt-1 block w-full"
            accept="image/*"
          />
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
        {/* Mappa per selezionare la posizione */}
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Seleziona la posizione sulla mappa</label>
          <MapContainer center={selectedPosition || position} zoom={5} style={{ height: '300px', width: '100%' }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler />
            {(selectedPosition || position) && (
              <Marker position={selectedPosition || position}>
                <Popup>
                  <span>Ultima posizione selezionata:<br/>Lat: {(selectedPosition || position)[0].toFixed(5)}, Lng: {(selectedPosition || position)[1].toFixed(5)}</span>
                </Popup>
              </Marker>
            )}
          </MapContainer>
          <div className="mt-2">
            <span className="text-sm">
              Ultima posizione selezionata: {(selectedPosition || position)[0].toFixed(5)}, {(selectedPosition || position)[1].toFixed(5)}
            </span>
          </div>
        </div>
        <div>
          <button type="submit" className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Crea articolo
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreaArticoloComp;