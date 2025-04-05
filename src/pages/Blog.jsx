import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/articles/ArticleCard';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Using Dev.to API (no API key needed)
  const API_URL = 'https://dev.to/api/articles?top=30';

  // Popular tags from Dev.to as categories
  const categories = [
    'All', 
    'JavaScript', 
    'React', 
    'Webdev', 
    'Python', 
    'CSS',
    'Programming',
    'Productivity'
  ];

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
          content: article.body_markdown || 'Full content not available',
          category: article.tag_list[0] || 'Programming', // Use first tag as category
          date: new Date(article.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          readTime: `${article.reading_time_minutes || 5} min read`,
          image: article.cover_image || article.social_image || 'https://via.placeholder.com/800x400?text=Dev.to',
          url: article.url,
          author: article.user.name || 'Unknown Author'
        }));

        setArticles(formattedArticles);
      } catch (err) {
        setError(err.message);
        setArticles(getFallbackArticles()); // Use fallback if API fails
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
        title: 'Getting Started with React Hooks',
        excerpt: 'Learn how to use React Hooks in your applications',
        content: 'Full article about React Hooks...',
        category: 'React',
        date: new Date().toLocaleDateString(),
        readTime: '5 min read',
        image: 'https://via.placeholder.com/800x400?text=React',
        url: '#',
        author: 'Jane Doe'
      },
      {
        id: 2,
        title: 'Modern JavaScript Techniques',
        excerpt: 'Explore ES6+ features every developer should know',
        content: 'Full article about JavaScript...',
        category: 'JavaScript',
        date: new Date().toLocaleDateString(),
        readTime: '7 min read',
        image: 'https://via.placeholder.com/800x400?text=JavaScript',
        url: '#',
        author: 'John Smith'
      }
    ];
  };

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(article => 
        article.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-600">Error loading articles</h2>
        <p className="mt-4 text-gray-600">{error}</p>
        <p className="mt-2 text-gray-500">Showing fallback articles instead</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Developer Articles
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Latest tech articles from the Dev.to community
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No articles found in this category</p>
            <button 
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              View All Articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;