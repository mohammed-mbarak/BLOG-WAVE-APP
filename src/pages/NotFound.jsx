// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <SectionContainer>
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-xl mb-8">The page you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </SectionContainer>
    </MainLayout>
  );
};

export default NotFound;