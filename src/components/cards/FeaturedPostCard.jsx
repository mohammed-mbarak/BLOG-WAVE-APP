// src/components/cards/FeaturedPostCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{post.category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          <Link to={`/blog/${post.id}`} className="hover:text-emerald-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
      </div>
    </div>
  );
};

export default FeaturedPostCard;