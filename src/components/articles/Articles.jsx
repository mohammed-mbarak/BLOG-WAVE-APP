import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Articles = ({ showAllButton = true, maxArticles = 4 }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Using Dev.to API (no API key needed)
  const API_URL = 'https://dev.to/api/articles?top=30';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        
        const formattedArticles = data.map((article, index) => ({
          id: article.id || index,
          title: article.title,
          excerpt: article.description || 'Click to read this interesting article...',
          category: article.tag_list[0] || 'Programming',
          date: new Date(article.published_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          readTime: `${article.reading_time_minutes || 5} min read`,
          image: article.cover_image || article.social_image || 'https://via.placeholder.com/800x400?text=Dev.to'
        }));

        setArticles(formattedArticles);
      } catch (err) {
        setError(err.message);
        setArticles(getFallbackArticles());
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Fallback articles if API fails
  const getFallbackArticles = () => {
    return [
      {
        id: 1,
        title: 'The Future of Web Development',
        excerpt: 'Exploring the latest trends in web development',
        category: 'Technology',
        date: 'May 15, 2023',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
      },
      {
        id: 2,
        title: 'Sustainable Living in Urban Areas',
        excerpt: 'Practical tips for reducing your carbon footprint',
        category: 'Lifestyle',
        date: 'April 28, 2023',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 3,
        title: 'Hidden Gems of Southeast Asia',
        excerpt: 'Discover less-traveled destinations',
        category: 'Travel',
        date: 'April 10, 2023',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1130&q=80'
      },
      {
        id: 4,
        title: 'Plant-Based Recipes for Beginners',
        excerpt: 'Simple and delicious plant-based meals',
        category: 'Food',
        date: 'March 22, 2023',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80'
      }
    ];
  };

  const categories = ['All', 'Technology', 'Lifestyle', 'Travel', 'Food', 'Programming'];
  
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(article => 
        article.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  // Limit articles when not showing all
  const displayedArticles = showAllButton 
    ? filteredArticles.slice(0, maxArticles)
    : filteredArticles;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading articles: {error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Dive into our collection of thoughtful and engaging content
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${category === 'All' ? 'rounded-l-md' : ''} ${
                  category === categories[categories.length - 1] ? 'rounded-r-md' : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {displayedArticles.map((article) => (
            <article key={article.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                      {article.excerpt}
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
          ))}
        </div>

        {/* View All Button - Only shown if showAllButton prop is true */}
        {showAllButton && (
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
            >
              View All Articles
              <svg
                className="ml-3 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;