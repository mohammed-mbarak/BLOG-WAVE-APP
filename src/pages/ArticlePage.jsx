// src/pages/articles/[slug].jsx
import React from 'react';
import { useParams } from 'react-router-dom';

// Mock data - replace with actual API calls
const articlesData = {
  'mindful-productivity': {
    id: 1,
    title: 'The Art of Mindful Productivity',
    content: '<p>Full article content about mindful productivity...</p>',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'June 15, 2023'
  },
  'urban-gardening': {
    id: 2,
    title: 'Urban Gardening for Small Spaces',
    content: '<p>Full article content about urban gardening...</p>',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'July 2, 2023'
  },
  'quantum-computing': {
    id: 3,
    title: 'Introduction to Quantum Computing',
    content: '<p>Full article content about quantum computing...</p>',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    date: 'August 10, 2023'
  }
};

const ArticlePage = () => {
  const { slug } = useParams(); // Changed from useRouter to useParams
  const article = articlesData[slug];

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <p className="text-gray-600 mt-4">The requested article could not be found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <article className="prose prose-lg max-w-none">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-4">
          {article.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-8">{article.date}</p>
        <div className="mb-8">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  );
};

export default ArticlePage;