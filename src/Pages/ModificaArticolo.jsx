import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function ModificaArticolo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [titolo, setTitolo] = useState('');
  const [contenuto, setContenuto] = useState('');
  const [immagineCopertina, setImmagineCopertina] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Recupera i dati dell'articolo dalla location state
    if (location.state) {
      const { id, title, description, contenuto, tags, publishedDate } = location.state;
      setArticle(location.state);
      setTitolo(title);
      setContenuto(contenuto);
      setDescription(description);
      setTags(tags.join(','));
      setPublishedDate(publishedDate);
    } else {
      alert('Errore: articolo non trovato.');
      navigate('/home');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: article.id,
      title: titolo,
      description,
      contenuto,
      tags: tags.split(','),
      publishedDate,
    };

    console.log('ID articolo:', article.id); // Log per verificare l'ID dell'articolo
    console.log('Payload inviato:', payload); // Log per verificare i dati inviati

    try {
      const response = await fetch('http://localhost:3001/api/articles/modifyarticle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('Stato della risposta:', response.status); // Log dello stato della risposta
      console.log('Risposta completa:', await response.text()); // Log del corpo della risposta

      if (response.ok) {
        alert('Articolo aggiornato con successo!');
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert(`Errore durante l'aggiornamento dell'articolo: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Errore durante l\'aggiornamento:', error);
      alert('Errore durante l\'aggiornamento');
    }
  };

  if (!article) {
    return <p>Caricamento in corso...</p>;
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