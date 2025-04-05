import React from 'react';
import PropTypes from 'prop-types';

const TrendingTopics = ({ topics = [], onTopicClick }) => {
  // Use default topics if none are provided
  const defaultTopics = [
    { name: 'Web Development', icon: '💻', posts: 24 },
    { name: 'Global News', icon: '🌍', posts: 18 },
    { name: 'Mental Wellness', icon: '🧠', posts: 32 },
    { name: 'Green Tech', icon: '♻️', posts: 15 },
    { name: 'Remote Work', icon: '🏠', posts: 29 },
    { name: 'AI Ethics', icon: '🤖', posts: 12 }
  ];
  
  // Use provided topics if available, otherwise use defaults
  const displayTopics = topics && topics.length > 0 ? topics : defaultTopics;
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Trending Topics</h2>
          <p className="mt-3 text-lg text-gray-600">Discover what our community is talking about</p>
          <div className="text-xs text-gray-500 mt-2">Auto-refreshes every 5 minutes</div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayTopics.map((topic, index) => (
            <div
              key={`${topic.name}-${index}`}
              className="bg-gray-50 rounded-lg p-5 text-center hover:bg-emerald-50 transition-colors duration-200 cursor-pointer group relative overflow-hidden"
              onClick={() => onTopicClick?.(topic)}
            >
              <span className="text-4xl mb-2 inline-block transition-transform group-hover:scale-110">
                {topic.icon}
              </span>
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 line-clamp-2 min-h-[48px]">
                {topic.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {topic.posts}+ articles
              </p>
              
              {/* Source badge - only shown if source is available */}
              {topic.source && (
                <div className="absolute top-2 right-2 bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">
                  {topic.source}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

TrendingTopics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      posts: PropTypes.number.isRequired,
      url: PropTypes.string,
      source: PropTypes.string
    })
  ),
  onTopicClick: PropTypes.func
};

export default TrendingTopics;