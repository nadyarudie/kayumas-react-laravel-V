// src/pages/ArticleList.jsx

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { articlesData } from '../data/articles';

// Konsisten dengan ArticleSection.jsx
const categoryStyles = {
  news: { bg: 'bg-blue-100', text: 'text-blue-800' },
  pengumuman: { bg: 'bg-green-100', text: 'text-green-800' },
  renungan: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  laporan: { bg: 'bg-purple-100', text: 'text-purple-800' },
};

// Kartu artikel (DITAMBAH: is-visible agar tidak hilang setelah ganti filter)
const ArticleListItem = ({ article, delay }) => {
  const style = categoryStyles[article.category] || {};
  return (
    <div
      className="article-card flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl will-animate is-visible"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link to={`/artikel/${article.slug}`} className="block md:w-1/3 flex-shrink-0">
        <img src={article.image} alt={article.title} className="w-full h-48 md:h-full object-cover" />
      </Link>
      <div className="p-6 flex flex-col justify-between">
        <div>
          <div className="mb-2">
            <span className={`inline-block ${style.bg} ${style.text} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider`}>
              {article.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-primary leading-snug mb-2">
            <Link to={`/artikel/${article.slug}`} className="hover:underline">{article.title}</Link>
          </h3>
          <p className="text-sm text-gray-500 mb-4">{article.date} &bullet; {article.author}</p>
        </div>
        <Link to={`/artikel/${article.slug}`} className="font-bold text-accent hover:underline self-start">
          Baca Selengkapnya &rarr;
        </Link>
      </div>
    </div>
  );
};

const ArticleList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['all', 'news', 'pengumuman', 'renungan', 'laporan'];

  const filteredArticles = useMemo(() => {
    return articlesData
      .filter(a => (activeFilter === 'all' ? true : a.category === activeFilter))
      .filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, activeFilter]);

  return (
    <main>
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/021f6e/ffffff?text=Galeri+Artikel')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate is-visible">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Galeri Artikel</h1>
            <p className="mt-4 text-lg">Kumpulan Berita, Renungan, dan Informasi Terkini</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="will-animate is-visible">
            <div className="mb-8 max-w-lg mx-auto">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
                <input
                  type="search"
                  placeholder="Cari judul artikel..."
                  className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`filter-btn font-semibold py-2 px-5 rounded-full transition-all duration-300 ${activeFilter === filter ? 'active-filter' : ''}`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <ArticleListItem key={article.id} article={article} delay={index * 100} />
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">Artikel tidak ditemukan.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticleList;
