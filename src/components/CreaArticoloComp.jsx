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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br to-blue-700 p-6">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-300/40 p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-blue-900 text-center">Crea una nuova segnalazione</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome del Gatto */}
          <div className="space-y-1">
            <label htmlFor="titolo" className="block text-blue-900 font-medium">Nome del Gatto *</label>
            <input
              id="titolo"
              type="text"
              value={titolo}
              onChange={e => setTitolo(e.target.value)}
              required
              className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Inserisci il nome del gatto"
            />
          </div>

          {/* Descrizione Gatto */}
          <div className="space-y-1">
            <label htmlFor="description" className="block text-blue-900 font-medium">Descrizione Gatto *</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              required
              className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="Una breve descrizione"
            />
          </div>

          {/* Contenuto Markdown */}
          <div className="space-y-1">
            <label htmlFor="contenuto" className="block text-blue-900 font-medium">Contenuto Segnalazione *</label>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="px-3 py-1 text-sm bg-blue-300/40 text-blue-900 rounded-lg hover:bg-blue-400/60 transition"
              >
                {isPreview ? 'Modifica' : 'Anteprima'}
              </button>
            </div>
            {isPreview ? (
              <div className="prose prose-lg prose-blue p-4 bg-blue-100/60 border border-blue-300/40 rounded-xl">
                <ReactMarkdown>{contenuto}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                id="contenuto"
                value={contenuto}
                onChange={e => setContenuto(e.target.value)}
                rows={6}
                required
                className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                placeholder="Scrivi qui il contenuto in Markdown..."
              />
            )}
          </div>

          {/* Immagine di Copertina */}
          <div className="space-y-1">
            <label htmlFor="immagineCopertina" className="block text-blue-900 font-medium">Immagine di Copertina</label>
            <input
              id="immagineCopertina"
              type="file"
              accept="image/*"
              onChange={e => setImmagineCopertina(e.target.files[0])}
              className="w-full text-blue-900"
            />
          </div>

          {/* Data di Pubblicazione */}
          <div className="space-y-1">
            <label htmlFor="publishedDate" className="block text-blue-900 font-medium">Data di Pubblicazione *</label>
            <input
              id="publishedDate"
              type="date"
              value={publishedDate}
              onChange={e => setPublishedDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label htmlFor="tags" className="block text-blue-900 font-medium">Tags (separati da virgola) *</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              required
              className="w-full px-4 py-3 bg-blue-100/60 border border-blue-300/40 rounded-xl placeholder-blue-700/70 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              placeholder="es. gatto, randagio, simpatico"
            />
          </div>

          {/* Mappa */}
          <div className="space-y-1">
            <label className="block text-blue-900 font-medium">Seleziona la posizione sulla mappa</label>
            <div className="w-full h-64 border border-blue-300/40 rounded-xl overflow-hidden">
              <MapContainer center={selectedPosition || position} zoom={5} className="h-full w-full">
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClickHandler />
                {(selectedPosition || position) && (
                  <Marker position={selectedPosition || position}>
                    <Popup>
                      Lat: {(selectedPosition || position)[0].toFixed(5)}, Lng: {(selectedPosition || position)[1].toFixed(5)}
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg"
          >
            Crea Articolo
          </button>
        </form>
      </div>
    </div>
  );
}  

export default CreaArticoloComp;