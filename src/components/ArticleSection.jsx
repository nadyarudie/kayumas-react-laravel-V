// src/components/ArticleSection.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const categoryStyles = {
  news: { bg: "bg-blue-100", text: "text-blue-800" },
  pengumuman: { bg: "bg-green-100", text: "text-green-800" },
  renungan: { bg: "bg-yellow-100", text: "text-yellow-800" },
  laporan: { bg: "bg-purple-100", text: "text-purple-800" },
  default: { bg: "bg-gray-100", text: "text-gray-800" },
};

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const ArticleCard = ({ article, delay }) => {
  const kategori = article.kategoris?.toLowerCase() || "news";
  const styles = categoryStyles[kategori] || categoryStyles.default;

  const imageSrc = `${IMAGE_URL}/${article.published_at
    ?.slice(0, 7)
    .replace("-", "/")}/${article.bigimage}`;

  return (
    <div
      className="article-card flex flex-col bg-white rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={imageSrc}
        alt={article.judul}
        className="w-full h-56 object-cover"
        onError={(e) => (e.target.src = "/fallback.jpg")}
      />
      <div className="p-8 flex flex-col flex-grow">
        {/* Kategori (chip-style oval) */}
        <div className="mb-4">
          <span
            className={`inline-block ${styles.bg} ${styles.text} text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider`}
          >
            {kategori}
          </span>
        </div>

        {/* Info tanggal & penulis tanpa bullet */}
        <p className="text-sm text-gray-500 mb-2">
          {article.published_at?.split(" ")[0]}   • {article.penulis || "-"}
        </p>

        <h3 className="text-2xl font-bold mb-3 text-primary leading-snug">
          {article.judul}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>

        <Link
          to={`/artikel/${article.slug}`}
          className="font-bold text-accent hover:underline mt-auto"
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </div>
  );
};

const ArticleSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_URL}/articles`);
        const json = await res.json();
        setArticles(json.data || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (activeFilter === "all") return articles;
    return articles.filter(
      (a) => (a.kategoris?.toLowerCase() || "news") === activeFilter
    );
  }, [activeFilter, articles]);

  const filters = ["all", "news", "pengumuman", "renungan", "laporan"];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-primary section-title">
          Artikel Terbaru
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 my-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-semibold py-2 px-5 rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading / Empty / Data */}
        {loading ? (
          <p className="text-center text-gray-500 mt-12">Memuat artikel...</p>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {filteredArticles.slice(0, 3).map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                delay={index * 150}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 max-w-2xl mx-auto text-center bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-primary mb-2">
              Belum ada artikel untuk kategori ini.
            </h3>
            <p className="text-gray-600 mb-6">
              Coba pilih kategori lain atau lihat semua artikel yang tersedia.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/artikel"
            className="btn-primary text-white font-bold py-4 px-10 rounded-full text-lg"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
