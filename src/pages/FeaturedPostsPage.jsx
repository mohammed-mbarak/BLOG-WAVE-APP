// src/pages/FeaturedPostsPage.jsx
import React, { useState, useEffect } from 'react';
import FeaturedPosts from '../components/articles/FeaturedPosts';

const FeaturedPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevToArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('https://dev.to/api/articles?per_page=6&top=7');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log('API Response:', data); // Debugging log

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format from API');
        }

        const formattedPosts = data.map((article, index) => ({
          id: article.id || index,
          title: article.title || 'Untitled Tech Article',
          excerpt: article.description || 
                  (article.body_markdown ? `${article.body_markdown.substring(0, 100)}...` : 'No excerpt available'),
          category: article.tag_list?.[0]?.replace(/-/g, ' ') || 'Technology',
          image: article.cover_image || 
                article.social_image || 
                `https://source.unsplash.com/random/600x400/?tech,${index}`,
          slug: article.slug || `article-${index}`,
          url: article.url || `https://dev.to/`
        }));

        console.log('Formatted Posts:', formattedPosts); // Debugging log

        if (formattedPosts.length === 0) {
          setError('No articles found (empty response)');
        } else {
          setPosts(formattedPosts);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch tech articles');
        // Fallback to local demo data if API fails
        setPosts(getFallbackData());
      } finally {
        setIsLoading(false);
      }
    };

    // Local fallback data
    const getFallbackData = () => {
      return [
        {
          id: 1,
          title: 'Getting Started with React',
          excerpt: 'Learn the basics of React and how to build your first component.',
          category: 'React',
          image: 'https://source.unsplash.com/random/600x400/?react',
          slug: 'getting-started-with-react',
          url: 'https://dev.to/'
        },
        // Add more fallback articles as needed
      ];
    };

    fetchDevToArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Loading Tech Stories from Dev.to...
          </h1>
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">
              Fetching the latest tech articles...
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Tech Stories
          </h1>
          <div className="text-center text-red-500 mb-4">
            Error: {error}
          </div>
          <div className="text-center text-gray-600">
            Showing demo content instead
          </div>
          <FeaturedPosts posts={posts} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Latest Tech Stories from Dev.to
        </h1>
        <FeaturedPosts posts={posts} />
      </main>
    </div>
  );
};

export default FeaturedPostsPage;