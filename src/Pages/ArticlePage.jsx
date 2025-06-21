import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../components/AuthContext';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


function ArticlePage() {
  const { articleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Recupera il contesto di autenticazione
  const article = location.state;
  const tags = article.tags || []; // Assicuriamoci che tags sia sempre un array
  // Imposta posizione di default se non presente o non valida
  console.log('Posizione ricevuta nell\'article:', article.position);
  let position = Array.isArray(article?.position) && article.position.length === 2
    ? article.position
    : [41.9028, 12.4964]; // Roma come posizione predefinita

  const tagsArray = Array.isArray(article.tags)
    ? tags
    : typeof tags === 'string'
    ? tags.split(',').map((tag) => tag.trim())
    : [];

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      setErrorComments(null);
      try {
        const response = await fetch(`http://localhost:3001/api/articles/${article.id}/comments`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Errore nel recupero dei commenti');
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setErrorComments(err.message);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [article.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const response = await fetch(`http://localhost:3001/api/articles/${article.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: commentText })
      });
      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.comment]);
        setCommentText('');
      }
    } catch (err) {
      alert('Errore nell\'invio del commento');
    }
  };

  if (!article) {
    return <p>Errore nel caricamento</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="w-full max-w-3xl mx-auto mb-6 rounded-lg shadow-md"
      />

      {/* Mappa interattiva sotto l'immagine */}
      <div className="w-full max-w-3xl mx-auto mb-6" style={{ height: '400px' }}>
        <MapContainer center={[41.9028, 12.4964]} zoom={5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              Posizione del Gatto!
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Renderizzazione del Markdown dopo l'immagine */}
      <div className="prose lg:prose-lg my-6">
        <ReactMarkdown>{article.contenuto}</ReactMarkdown> {/* Corpo dell'articolo in Markdown */}
      </div>

      <p className="text-gray-700 text-lg">{article.description}</p>
      <div className="text-gray-500 text-sm my-4">
        <p>Pubblicato il: {article.publishedDate}</p>
        {article.lastEditDate && <p>Ultima modifica: {article.lastEditDate}</p>}
      </div>

      {tagsArray.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tagsArray.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {article.author === user?.nome && (
        <button
          onClick={() => navigate(`/modifica-articolo/${articleId}`,
            {
              state: {
                id: article.id,
                title: article.title,
                contenuto: article.contenuto,
                description: article.description,
                tags: article.tags,
                publishedDate: article.publishedDate
              }
            }
          )}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Modifica Articolo
        </button>
      )}

      {/* Commenti */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Commenti</h2>
        {loadingComments && <p>Caricamento commenti...</p>}
        {errorComments && <p className="text-red-500">{errorComments}</p>}
        {!loadingComments && comments.length === 0 && <p>Nessun commento ancora.</p>}
        {comments.map((c, i) => (
          <div key={i} className="mb-2 p-2 bg-gray-100 rounded">
            <strong>{c.author}</strong>: {c.text}
            <div className="text-xs text-gray-500">
              {(() => {
                const d = new Date(c.createdAt);
                return isNaN(d) ? "now" : d.toLocaleString();
              })()}
            </div>
          </div>
        ))}
        {user && (
          <form onSubmit={handleCommentSubmit} className="mt-4 flex flex-col">
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="border rounded p-2 mb-2"
              placeholder="Scrivi un commento..."
              rows={2}
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 self-end">
              Invia commento
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ArticlePage;