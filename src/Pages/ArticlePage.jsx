import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

function ArticlePage() {
  const {articleId} = useParams();
  const location = useLocation();
  const article = location.state;
  

  if(!article)
  {
    return <p>Errore nel caricamento</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="w-full max-w-3xl mx-auto mb-6 rounded-lg shadow-md"
      />
      <p className="text-gray-700 text-lg">{article.description}</p>
      <div className="text-gray-500 text-sm my-4">
        <p>Pubblicato il: {article.publishedDate}</p>
        {article.lastEditDate && <p>Ultima modifica: {article.lastEditDate}</p>}
      </div>
      <div className="prose lg:prose-lg">
        <p>{article.body}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {article.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ArticlePage;