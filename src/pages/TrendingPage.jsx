import React, { useState, useEffect } from 'react';
import TrendingTopics from '../components/articles/TrendingTopics';

const TrendingPage = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('');

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        setLoading(true);
        
        // Use AbortController for timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        // Try multiple API sources in sequence
        let success = false;
        
        // 1. First try HackerNews API (very reliable, no API key needed)
        if (!success) {
          try {
            const topStoriesRes = await fetch(
              'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
              { signal: controller.signal }
            );
            
            if (topStoriesRes.ok) {
              const storyIds = await topStoriesRes.json();
              const topSixIds = storyIds.slice(0, 6);
              
              // Fetch details for top 6 stories
              const storyPromises = topSixIds.map(id => 
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                  .then(res => res.json())
              );
              
              const stories = await Promise.all(storyPromises);
              
              // Transform stories to our format
              const transformedData = stories.map((story, index) => ({
                name: story.title.substring(0, 25) + (story.title.length > 25 ? '...' : ''),
                icon: ['💻', '🌍', '🧠', '♻️', '🏠', '🤖'][index % 6] || '📰',
                posts: story.score || Math.floor(Math.random() * 30) + 10,
                url: story.url,
                source: 'HackerNews'
              }));
              
              setTrendingData(transformedData);
              setDataSource('HackerNews');
              success = true;
              console.log('Successfully fetched from HackerNews API');
            }
          } catch (error) {
            console.error('HackerNews API error:', error);
          }
        }
        
        // 2. Try JSONPlaceholder as a reliable fallback (though with mock data)
        if (!success) {
          try {
            const response = await fetch(
              'https://jsonplaceholder.typicode.com/posts?_limit=6',
              { signal: controller.signal }
            );
            
            if (response.ok) {
              const posts = await response.json();
              
              // Transform posts to our format
              const transformedData = posts.map((post, index) => {
                // Create topic names from the post titles (first few words)
                const words = post.title.split(' ');
                const topicName = words.slice(0, 3).join(' ');
                
                return {
                  name: topicName.charAt(0).toUpperCase() + topicName.slice(1),
                  icon: ['💻', '🌍', '🧠', '♻️', '🏠', '🤖'][index % 6] || '📰',
                  posts: Math.floor(Math.random() * 30) + 10,
                  url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
                  source: 'JSONPlaceholder'
                };
              });
              
              setTrendingData(transformedData);
              setDataSource('JSONPlaceholder (Demo Data)');
              success = true;
              console.log('Successfully fetched from JSONPlaceholder API');
            }
          } catch (error) {
            console.error('JSONPlaceholder API error:', error);
          }
        }
        
        // 3. Try NewsAPI with your existing key
        if (!success) {
          try {
            // Using environment variable or fallback (as in your original code)
            const apiKey = import.meta.env.VITE_NEWS_API_KEY || 'f4a32c32d9c24560a6e013f747559f25';
            
            const response = await fetch(
              `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${apiKey}`,
              { signal: controller.signal }
            );
            
            if (response.ok) {
              const data = await response.json();
              
              if (data.status === "ok" && data.articles?.length) {
                const transformedData = data.articles.map((article, index) => ({
                  name: (article.source?.name || `News ${index + 1}`)
                    .replace(/[^a-zA-Z0-9 ]/g, '')
                    .trim()
                    .substring(0, 20),
                  icon: ['💻', '🌍', '🧠', '♻️', '🏠', '🤖'][index % 6] || '📰',
                  posts: Math.floor(Math.random() * 30) + 10,
                  url: article.url,
                  source: 'NewsAPI'
                }));
                
                setTrendingData(transformedData);
                setDataSource('NewsAPI');
                success = true;
                console.log('Successfully fetched from NewsAPI');
              }
            }
          } catch (error) {
            console.error('NewsAPI error:', error);
          }
        }
        
        // 4. Final fallback to static data if all APIs fail
        if (!success) {
          console.log('All API requests failed, using static data');
          const fallbackData = [
            { name: 'Web Development', icon: '💻', posts: 24, url: '#', source: 'Static' },
            { name: 'Global News', icon: '🌍', posts: 18, url: '#', source: 'Static' },
            { name: 'Mental Wellness', icon: '🧠', posts: 32, url: '#', source: 'Static' },
            { name: 'Green Tech', icon: '♻️', posts: 15, url: '#', source: 'Static' },
            { name: 'Remote Work', icon: '🏠', posts: 29, url: '#', source: 'Static' },
            { name: 'AI Ethics', icon: '🤖', posts: 12, url: '#', source: 'Static' }
          ];
          
          setTrendingData(fallbackData);
          setDataSource('Static Fallback Data');
          setError('Could not connect to any trending data API');
        }
        
        clearTimeout(timeoutId);
      } catch (err) {
        console.error("Global fetch error:", err);
        setError(err.message);
        
        // Enhanced fallback data
        const fallbackData = [
          { name: 'Web Development', icon: '💻', posts: 24, url: '#', source: 'Static' },
          { name: 'Global News', icon: '🌍', posts: 18, url: '#', source: 'Static' },
          { name: 'Mental Wellness', icon: '🧠', posts: 32, url: '#', source: 'Static' },
          { name: 'Green Tech', icon: '♻️', posts: 15, url: '#', source: 'Static' },
          { name: 'Remote Work', icon: '🏠', posts: 29, url: '#', source: 'Static' },
          { name: 'AI Ethics', icon: '🤖', posts: 12, url: '#', source: 'Static' }
        ];
        setTrendingData(fallbackData);
        setDataSource('Static Fallback Data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();

    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(fetchTrendingTopics, 5 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  // Handle topic click
  const handleTopicClick = (topic) => {
    if (topic.url) {
      window.open(topic.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
            <p className="text-lg text-gray-600">Loading trending topics...</p>
          </div>
        </div>
      ) : (
        <>
          {trendingData && trendingData.length > 0 ? (
            <TrendingTopics 
              topics={trendingData} 
              onTopicClick={handleTopicClick}
            />
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">No trending topics available</p>
            </div>
          )}
          
          <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-yellow-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-yellow-700">
                        <span className="font-medium">Note:</span> {error}. Using fallback data.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span>Data source: {dataSource}</span>
                </div>
                <div className="mt-2">
                  <button 
                    onClick={() => window.location.reload()} 
                    className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default TrendingPage;