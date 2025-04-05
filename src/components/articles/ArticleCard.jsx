import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0">
        <img 
          className="h-48 w-full object-cover" 
          src={article.image} 
          alt={article.title} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/400x200';
          }}
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-emerald-600">
            {article.category}
          </p>
          <Link to={`/blog/${article.id}`} className="block mt-2">
            <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-200">
              {article.title}
            </h3>
            <p className="mt-3 text-base text-gray-500">
              {article.excerpt.length > 100 
                ? `${article.excerpt.substring(0, 100)}...` 
                : article.excerpt}
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={article.date}>{article.date}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;