// src/pages/Home.jsx
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroBanner from '../components/hero/HeroBanner';
import Testimonials from '../components/testimonials/Testimonials';
import Articles from '../components/articles/Articles';
import FeaturedPosts from '../components/articles/FeaturedPosts';
import TrendingTopics from '../components/articles/TrendingTopics';
import AuthorSpotlight from '../components/articles/AuthorSpotlight';
import StatsShowcase from '../components/articles/StatsShowcase';

export default function Home() {
  return (
    <MainLayout>
      <HeroBanner />
      <FeaturedPosts />
      <Articles />
      <TrendingTopics />
      <AuthorSpotlight />
      <Testimonials />
      <StatsShowcase />
    </MainLayout>
  );
}