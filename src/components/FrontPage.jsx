import React, { useState, useEffect } from 'react';
import InteractiveCard from './Articles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './NavBar';

function FrontPage() {

  const { isLoggedIn, login, logout } = useAuth();

  const [articles, setArticles] = useState([]);

  

  const [data, setData] = useState([
    {
      id: 1,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/300?random=1',
      title: 'Il pensionato sconosciuto che ha salvato il gatto',
      description: 'Un uomo di mezza età si è impegnato a seguire un gatto che era stato abbandonato e si era perso in un quartiere periferico. Il gatto era sparito da diversi giorni e nessuno sapeva dove si trovasse.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un pensionato sconosciuto si è impegnato a cercare e salvare un gatto che era stato abbandonato. Il testo descrive le sue azioni e i suoi tentativi per ritrovare il gatto.',
      tags: ['gatto', 'animali', 'pensionato']
    },
    {
      id: 3,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 4,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['basket', 'calcio', 'calcio mondiale']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['basket', 'calcio', 'calcio mondiale']
    },
    {
      id: 6,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 7,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 8,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 9,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '2010-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 10,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 11,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2023-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 12,
      image: 'https://picsum.photos/200/300?random=1',
      title: 'Il pensionato sconosciuto che ha salvato il gatto',
      description: 'Un uomo di mezza età si è impegnato a seguire un gatto che era stato abbandonato e si era perso in un quartiere periferico. Il gatto era sparito da diversi giorni e nessuno sapeva dove si trovasse.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un pensionato sconosciuto si è impegnato a cercare e salvare un gatto che era stato abbandonato. Il testo descrive le sue azioni e i suoi tentativi per ritrovare il gatto.',
      tags: ['gatto', 'animali', 'pensionato']
    },
    {
      id: 13,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 14,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 15,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2015-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 16,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2022-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 17,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '2017-01-01',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    }
  ]);
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
        console.log('Articles:', articles)
        console.log('VisibleArticles:', visibleArticles)
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


  

  // Carica altri articoli quando l'utente clicca sul pulsante "Carica Altro"
/* const handleLoadMore = () => {
  // Verifica se l'utente è loggato
  if (isLoggedIn) {
    // Calcola la lunghezza attuale degli articoli visibili
    const currentLength = visibleArticles.length;
    // Calcola gli articoli successivi da caricare
    const nextArticles = articles.slice(currentLength, currentLength + 5);
    // Aggiunge gli articoli successivi agli articoli visibili
    setVisibleArticles([...visibleArticles, ...nextArticles]);
  } else {
    // Se l'utente non è loggato, mostra un messaggio di alert e reindirizza alla pagina di login
    alert('Devi effettuare il log in prima di vedere questo contenuto');
    navigate('/login');
  }
}; */
  

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