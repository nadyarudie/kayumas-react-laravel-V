// src/components/ArticleSection.jsx

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { articlesData } from '../data/articles';

const categoryStyles = {
  news: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-600' },
  pengumuman: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-600' },
  renungan: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  laporan: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-600' },
};

const ArticleCard = ({ article, delay }) => {
  const styles = categoryStyles[article.category] || {};
  return (
    <div
      className="article-card flex flex-col bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl will-animate is-visible"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <span className={`inline-block ${styles.bg} ${styles.text} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider`}>
            <span className={`inline-block w-2 h-2 mr-2 ${styles.dot} rounded-full`}></span>
            {article.category}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-2">{article.date} &bullet; {article.author}</p>
        <h3 className="text-2xl font-bold mb-3 text-primary leading-snug">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
        <Link to={`/artikel/${article.slug}`} className="font-bold text-accent hover:underline mt-auto">
          Baca Selengkapnya →
        </Link>
      </div>
    </div>
  );
};

const ArticleSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'all') return articlesData;
    return articlesData.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  const filters = ['all', 'news', 'pengumuman', 'renungan', 'laporan'];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="will-animate is-visible">
          <h2 className="text-4xl font-bold text-center text-primary section-title">Artikel Terbaru</h2>
        </div>

        {/* Filter */}
        <div
          id="filter-buttons"
          className="flex flex-wrap justify-center gap-2 md:gap-4 my-10 will-animate is-visible"
          style={{ transitionDelay: '100ms' }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-btn font-semibold py-2 px-5 rounded-full transition-all duration-300 ${
                activeFilter === filter ? 'active-filter' : ''
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid artikel atau empty state */}
        {filteredArticles.length > 0 ? (
          <div id="article-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {filteredArticles.slice(0, 3).map((article, index) => (
              <ArticleCard key={article.id} article={article} delay={index * 150} />
            ))}
          </div>
        ) : (
          <div className="mt-12 max-w-2xl mx-auto text-center bg-gray-50 border border-gray-200 rounded-xl p-8 will-animate is-visible">
            <h3 className="text-xl font-bold text-primary mb-2">Belum ada artikel untuk kategori ini.</h3>
            <p className="text-gray-600 mb-6">
              Coba pilih kategori lain atau lihat semua artikel yang tersedia.
            </p>
          </div>
        )}

        {/* CTA lihat semua: selalu tampil */}
        <div className="text-center mt-16 will-animate is-visible" style={{ transitionDelay: '450ms' }}>
          <Link to="/artikel" className="btn-primary text-white font-bold py-4 px-10 rounded-full text-lg">
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
