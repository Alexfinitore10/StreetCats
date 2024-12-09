import React, { useState, useEffect } from 'react';
import InteractiveCard from './Articles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './NavBar';

function FrontPage() {

  const { isLoggedIn, login, logout } = useAuth();

  const [articles, setArticles] = useState([]);

  const [farticles, fsetArticles] = useState(articles);
  

  const location = useLocation();

  const navigate = useNavigate();

  //Backend fetch
  useEffect(() => {
    fetch('http://localhost:3001/articles')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Aggiungi questa riga per vedere i dati ricevuti
        setArticles(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const [visibleArticles, setVisibleArticles] = useState([]);

  //tag logic
  const [selectedTag, setSelectedTag] = useState(null); // Nuovo stato per il tag selezionato
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const sortArticlesByDate = (articles) => {
    return articles.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  };

  const resetStateFunction = () => {
    setSelectedTag(null);
    setCurrentPage(1);
    const sortedArticles = sortArticlesByDate(articles); // AGGIUNTO: Ordina gli articoli all'inizio
    setArticles(sortedArticles);
    setVisibleArticles(sortedArticles.slice(0, 10));
    fsetArticles(sortedArticles);
  };



  //tag logic
  useEffect(() => {
    if (selectedTag) {
      const filtered = articles
        .filter(article => article.tags.includes(selectedTag))
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)); // Ordina gli articoli dal più recente al meno recente
      fsetArticles(filtered);
      setCurrentPage(1); // Resetta la pagina corrente quando viene selezionato un nuovo tag
      setVisibleArticles(filtered.slice(0, articlesPerPage)); // Imposta le prime articoli filtrati visibili
    } else {
      fsetArticles([]);
      setVisibleArticles(articles.slice(0, 10));
    }
  }, [selectedTag, articles]);


  useEffect(() => {
    if (selectedTag) {
      const indexOfLastArticle = currentPage * articlesPerPage;
      const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
      const currentArticles = farticles.slice(indexOfFirstArticle, indexOfLastArticle);
      setVisibleArticles(currentArticles);
    } else {
      const indexOfLastArticle = currentPage * articlesPerPage;
      const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
      const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
      setVisibleArticles(currentArticles);
    }
  }, [selectedTag, farticles, currentPage, articlesPerPage, articles]);

  

  const handleTagClick = (tag) => {
    console.log(`Clicked on tag: ${tag}`);
    setSelectedTag(tag);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Cambia la pagina corrente
  };

  const totalPages = selectedTag
    ? Math.ceil(farticles.length / articlesPerPage)
    : Math.ceil(articles.length / articlesPerPage);

  const handleCardClick = (article) => {
    navigate(`/articolo/${article.id}`, { state: article });
  };

  useEffect(() => {
    if (location.pathname === '/home') {
      resetStateFunction();
    }
  }, [location.pathname, articles]);
  

  
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-4 mb-8">
      <h1 className="text-5xl font-bold mb-6"> {selectedTag ? `Articoli con tag: ${selectedTag}` : 'Benvenuto su PressPortal'}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleArticles.map((article) => (
          <InteractiveCard
            key={article.id}
            articleId={article.id}
            image={article.image}
            title={article.title}
            description={article.description}
            publishedDate={article.publishedDate}
            bodyPreview={article.bodyPreview}
            tags={article.tags}
            onTagClick={handleTagClick}
            onCardClick={() => handleCardClick(article)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 mb-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition-colors duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            Precedente
          </button>
          <span className="mx-2">Pagina {currentPage} di {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition-colors duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPages}
          >
            Successivo
          </button>
        </div>
      )}
    </div>
  );
}
export default FrontPage;