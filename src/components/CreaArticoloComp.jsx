import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function CreaArticoloComp() {
  const [titolo, setTitolo] = useState('');
  const [contenuto, setContenuto] = useState('');
  const [immagineCopertina, setImmagineCopertina] = useState(null);
  const [description, setDescription] = useState('');
  const [bodyPreview, setBodyPreview] = useState('');
  const [tags, setTags] = useState('');
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparazione dei dati da inviare al backend
    const formData = new FormData();
    formData.append('title', titolo);
    formData.append('description', description);
    formData.append('publishedDate', publishedDate);
    formData.append('bodyPreview', bodyPreview);
    if (immagineCopertina) {
      formData.append('image', immagineCopertina);
    }
    formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim())));

    

    console.log('Dati articolo:', {
      title: titolo,
      body: contenuto,
      description: description,
      bodyPreview: bodyPreview,
      image: immagineCopertina ? immagineCopertina.name : null,
      publishedDate: publishedDate,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    // Esempio di invio dei dati al backend
    try {
      const response = await fetch('http://localhost:3001/api/article', {
        method: 'POST',
        body: formData,
      });

      console.log('Response:', response);

      if (response.ok) {
        alert('Articolo creato con successo!');
        // Resetta i campi
        setTitolo('');
        setContenuto('');
        setImmagineCopertina(null);
        setDescription('');
        setBodyPreview('');
        setTags('');
        setPublishedDate(new Date().toISOString().split(',')[0]);
      } else {
        alert('Errore nella creazione dell\'articolo');
      }
    } catch (error) {
      console.error('Errore durante l\'invio dei dati:', error);
      alert('Errore durante l\'invio dei dati');
    }
  };

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
          <label htmlFor="bodyPreview" className="block text-sm font-medium text-gray-700">Anteprima del Contenuto</label>
          <textarea
            id="bodyPreview"
            value={bodyPreview}
            onChange={(e) => setBodyPreview(e.target.value)}
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