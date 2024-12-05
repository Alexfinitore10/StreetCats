import React, { useState, useEffect } from 'react';
import InteractiveCard from './Articles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function FrontPage() {

  const { isLoggedIn, login, logout } = useAuth();

  const [articles, setArticles] = useState([
    {
      id: 1,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/300?random=1',
      title: 'Il pensionato sconosciuto che ha salvato il gatto',
      description: 'Un uomo di mezza età si è impegnato a seguire un gatto che era stato abbandonato e si era perso in un quartiere periferico. Il gatto era sparito da diversi giorni e nessuno sapeva dove si trovasse.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un pensionato sconosciuto si è impegnato a cercare e salvare un gatto che era stato abbandonato. Il testo descrive le sue azioni e i suoi tentativi per ritrovare il gatto.',
      tags: ['gatto', 'animali', 'pensionato']
    },
    {
      id: 3,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 4,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['basket', 'calcio', 'calcio mondiale']
    },
    {
      id: 5,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['basket', 'calcio', 'calcio mondiale']
    },
    {
      id: 6,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 7,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 8,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 9,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 10,
      image: 'https://t4.ftcdn.net/jpg/00/38/34/37/360_F_38343743_lOX7Y1W41vXWX2PzHNI9tzFrwfY929Le.jpg',
      title: 'Il lupo che ha salvato il villaggio',
      description: 'Un lupo ha salvato un villaggio da una violenta tempesta di neve. La notte era buia e il vento era forte, e molti abitanti del villaggio stavano rischiando in pericolo.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un lupo si è impegnato a salvare un villaggio da una violenta tempesta di neve. Il testo descrive le sue azioni e i suoi tentativi per salvare il villaggio.',
      tags: ['lupo', 'animali', 'villaggio']
    },
    {
      id: 11,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 12,
      image: 'https://picsum.photos/200/300?random=1',
      title: 'Il pensionato sconosciuto che ha salvato il gatto',
      description: 'Un uomo di mezza età si è impegnato a seguire un gatto che era stato abbandonato e si era perso in un quartiere periferico. Il gatto era sparito da diversi giorni e nessuno sapeva dove si trovasse.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come un pensionato sconosciuto si è impegnato a cercare e salvare un gatto che era stato abbandonato. Il testo descrive le sue azioni e i suoi tentativi per ritrovare il gatto.',
      tags: ['gatto', 'animali', 'pensionato']
    },
    {
      id: 13,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 14,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 15,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 16,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    },
    {
      id: 17,
      image: 'https://picsum.photos/200/300',
      title: 'L\'Italia si aggiudica il mondiale del basket',
      description: 'Una squadra di giocatori italiani ha vinto il mondiale di basket, dopo un\'annata di lavoro e sacrificio. I protagonisti sono stati il guardia tiratore Andrea Gigante e il centro Alessandro Chiti, che hanno guidato la squadra ad una finale sfida contro gli Stati Uniti, che però sono stati i campionati.',
      publishedDate: '01/01/2022',
      bodyPreview: 'Questo è un testo di esempio di un articolo, che parla di come l\'Italia si è aggiudicata il campionato mondiale di basket. Il testo è molto dettagliato e descrive le azioni dei giocatori e il loro ruolo nel successo della squadra.',
      tags: ['bruschetta', 'non ci credo']
    }
  ]);
  const [farticles, fsetArticles] = useState(articles);
  const [visibleArticles, setVisibleArticles] = useState(articles.slice(0, 10));

  const location = useLocation();

  const navigate = useNavigate();



  const handleLoadMore = () => {
  if (isLoggedIn) {
    const currentLength = visibleArticles.length;
    const nextArticles = articles.slice(currentLength, currentLength + 5);
    setVisibleArticles([...visibleArticles, ...nextArticles]);
  } else {
    // Redirect to login if not logged in
    alert('Devi effettuare il log in prima di vedere questo contenuto');
    navigate('/login');
  }
};


  const handleTagClick = (tag) => {
    console.log(`Clicked on tag: ${tag}`);
    //TODO Qui puoi aggiungere la logica per filtrare gli articoli in base al tag cliccato
    //fsetArticles(articles.filter(article => article.tags.includes(tag)));
    fsetArticles(articles.filter(article => 
      article.tags.split(', ').includes(tag)
    ));
  };

  const handleCardClick = (article) => {
    navigate(`/articolo/${article.id}`, { state: article });
  };
  

  useEffect(() => {
    if (location.pathname === '/home') {
      fsetArticles(articles.slice(0, 10));
    }
  }, [location.pathname]);

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-4 mb-8">
      <h1 className="text-5xl font-bold mb-6">Benvenuto su PressPortal</h1>
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
      {visibleArticles.length < articles.length && (
        <div className="mt-6 mb-6">
          <button 
            onClick={handleLoadMore} 
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            Carica Altro
          </button>
        </div>
      )}
    </div>
  );
}

export default FrontPage;