import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const InteractiveCard = ({
  articleId,
  image,
  title,
  description,
  publishedDate,
  contenuto,
  author,
  tags = [],
  onTagClick,
  onCardClick, // Nuova prop per il click sull'immagine
  isMyArticle, // Nuova prop per verificare se l'articolo è del giornalista
  lastEditDate, // Nuova prop per la data dell'ultima modifica
  isLoggedIn, // Nuova prop per verificare se l'utente è loggato
}) => {
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setGlarePosition({ x: 50, y: 50 });
  };

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const handleTagClick = (tag) => {
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  const handleCardClick = (article) => {
    if (onCardClick) {
      onCardClick(article);
    }
  };

  // Assicuriamoci che tags sia sempre un array
  const tagsArray = Array.isArray(tags)
    ? tags
    : typeof tags === 'string'
    ? tags.split(',').map((tag) => tag.trim())
    : [];

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col cursor-pointer hover:bg-gray-100 transition-colors duration-200"
      ref={cardRef}
    >
      <div className="w-full h-40 mb-4 relative">
        <img
          src={image}
          alt="Immagine articolo"
          className="w-full h-full object-cover rounded-md cursor-pointer"
          onClick={handleCardClick}
        />
      </div>
      <div className="w-full mb-2">
        <h2 className="text-2xl font-semibold text-gray-800" onClick={handleCardClick}>
          {title}
        </h2>
      </div>

      <div className="w-full mb-4">
        <p className="text-gray-600 text-sm" onClick={handleCardClick}>
          {description}
        </p>
      </div>

      <div className="w-full text-gray-500 text-xs mb-2 my-4">
        <p>Autore : {author}</p>
        <p>Pubblicato il: {publishedDate}</p>
        {lastEditDate && <p>Ultima modifica: {lastEditDate}</p>} {/* Mostra la data dell'ultima modifica se disponibile */}
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {tagsArray.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition-colors duration-200"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>

      {isLoggedIn && isMyArticle && (
        <button
          onClick={() => {
            console.log('Dati articolo passati:', { 
              id: articleId,
              title,
              description,
              contenuto,
              tags,
              publishedDate,
              author
            });
            navigate(`/modifica-articolo/${articleId}`, { 
              state: { 
                id: articleId,
                title,
                description,
                contenuto,
                tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
                publishedDate,
                author
              }
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Modifica
        </button>
      )}
    </div>
  );
};

export default InteractiveCard;
