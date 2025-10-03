// src/pages/Home.jsx

import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import ArticleSection from '../components/ArticleSection';
import YouTubeSection from '../components/YouTubeSection';
import LocationSection from '../components/LocationSection';

const Home = () => {
  return (
    <main>
      <HeroCarousel />
      <ArticleSection />
      <YouTubeSection />
      <LocationSection />
    </main>
  );
};

export default Home;