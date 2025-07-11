import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../components/AuthContext';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import Navbar from '../components/NavBar';


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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 to-slate-700">
      <Navbar />
      <div className="flex-1 w-full max-w-5xl px-4 flex flex-col items-center text-center py-12">
        <h1 className="text-5xl font-extrabold text-white drop-shadow mb-4">{article.title}</h1>
        <img
          src={article.image}
          alt={article.title}
          className="w-full max-w-3xl rounded-3xl shadow-2xl mb-6"
        />
  
        <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-white/20 mb-6">
          <MapContainer
            center={position}
            zoom={10}
            style={{ height: '400px', width: '100%' }}
            scrollWheelZoom={false}
            boxZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Posizione del Gatto!</Popup>
            </Marker>
          </MapContainer>
        </div>
  
        <div className="prose lg:prose-lg prose-invert text-white my-6 text-left w-full max-w-3xl">
          <ReactMarkdown>{article.contenuto}</ReactMarkdown>
        </div>
  
        <p className="text-white/80 text-lg max-w-3xl">{article.description}</p>
        <div className="text-white/50 text-sm my-4">
          <p>Pubblicato il: {article.publishedDate}</p>
          {article.lastEditDate && <p>Ultima modifica: {article.lastEditDate}</p>}
        </div>
  
        {tagsArray.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {tagsArray.map((tag, index) => (
              <span
                key={index}
                className="bg-white/20 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600 transition-colors duration-200"
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
                  publishedDate: article.publishedDate,
                  position: article.position,
                }
              }
            )}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.03] transition-all duration-200 shadow-lg"
          >
            Modifica Articolo
          </button>
        )}
  
        <div className="mt-12 w-full max-w-3xl">
          {user && (
            <form onSubmit={handleCommentSubmit} className="flex flex-col items-end">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="w-full border border-white/20 bg-white/10 text-white rounded-xl p-4 mb-2 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Scrivi un commento..."
                rows={3}
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.03] transition-all duration-200 shadow-lg"
              >
                Invia commento
              </button>
            </form>
          )}
  
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 text-left">Commenti</h2>
          {loadingComments && <p className="text-white/70">Caricamento commenti...</p>}
          {errorComments && <p className="text-red-500">{errorComments}</p>}
          {!loadingComments && comments.length === 0 && <p className="text-white/70">Nessun commento ancora.</p>}
          {comments.map((c, i) => (
            <div key={i} className="mb-3 p-4 bg-white/10 border border-white/20 rounded-xl text-white text-left">
              <strong>{c.author}</strong>: {c.text}
              <div className="text-xs text-white/50">
                {(() => {
                  const d = new Date(c.createdAt);
                  return isNaN(d) ? "now" : d.toLocaleString();
                })()}
              </div>
            </div>
          ))}
  
          {!user && (
            <div className="mt-4 text-white/70 italic">Effettua il login per commentare.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;