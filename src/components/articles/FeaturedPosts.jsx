// components/FeaturedPosts.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// High-quality demo tech articles with reliable images
const DEMO_POSTS = [
  {
    id: 1,
    title: 'Mastering React Hooks in 2023',
    excerpt: 'Learn how to use modern React hooks to build cleaner, more efficient components.',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    slug: 'react-hooks-guide',
    url: 'https://dev.to/'
  },
  {
    id: 2,
    title: 'TypeScript Best Practices',
    excerpt: 'Professional patterns for writing type-safe, maintainable TypeScript code.',
    category: 'TypeScript',
    image: 'https://images.unsplash.com/photo-1625831144430-4e46b841b3a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    slug: 'typescript-best-practices',
    url: 'https://dev.to/'
  },
  {
    id: 3,
    title: 'CSS Grid Layout Mastery',
    excerpt: 'Advanced techniques for creating responsive layouts with CSS Grid.',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    slug: 'css-grid-mastery',
    url: 'https://dev.to/'
  }
];

// Reliable fallback images from Unsplash
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Coding
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Programming
  'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'  // Tech
];

const getRandomFallback = () => FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];

const FeaturedPosts = ({ posts = [], isFallback = false }) => {
  const displayPosts = posts.length > 0 ? posts : DEMO_POSTS;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {isFallback ? 'Featured Tech Demos' : 'Latest Tech Stories'}
        </h2>
        
        {isFallback && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  We're currently showing demo content. The latest tech articles will appear here when available.
                </p>
              </div>
            </div>
          </div>
        )}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {displayPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getRandomFallback();
                      e.target.classList.add('object-contain', 'p-4');
                    }}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full mb-3">
                    {post.category || 'Technology'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 flex-1 line-clamp-3">
                    {post.excerpt || 'No excerpt available for this tech article.'}
                  </p>
                  <Link 
                    to={`/articles/${post.slug}`}
                    state={{ 
                      articleData: post,
                      isDemo: isFallback 
                    }}
                    className="mt-4 inline-flex items-center text-emerald-600 font-medium hover:text-emerald-800 transition-colors"
                  >
                    Read Story
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {isFallback && (
          <div className="text-center mt-8">
            <Link 
              to="/contact" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Notify me when live content is available
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;