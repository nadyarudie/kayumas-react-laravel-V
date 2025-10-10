// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const categoryStyles = {
  news: { bg: "bg-blue-100", text: "text-blue-800" },
  pengumuman: { bg: "bg-green-100", text: "text-green-800" },
  renungan: { bg: "bg-yellow-100", text: "text-yellow-800" },
  laporan: { bg: "bg-purple-100", text: "text-purple-800" },
  default: { bg: "bg-gray-100", text: "text-gray-800" },
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/articles/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const json = await res.json();
        const responseData = json.data || json;
        const data = Array.isArray(responseData) ? responseData[0] : responseData;

        if (!data) {
          setNotFound(true);
          return;
        }

        const kategori = data.kategoris?.toLowerCase() || "news";

        const imagePath = data.published_at
          ? `${IMAGE_URL}/${data.published_at.slice(0, 7).replace("-", "/")}/${data.bigimage}`
          : "/fallback.jpg";

        setArticle({
          ...data,
          kategoris: kategori,
          imageUrl: imagePath,
          isi: data.body,
        });

        // ambil related articles
        const relatedRes = await fetch(`${API_URL}/articles`);
        const relatedJson = await relatedRes.json();
        const allArticles = relatedJson.data || [];
        const related = allArticles
          .filter((a) => a.slug !== slug)
          .slice(0, 2)
          .map((a) => {
            const relatedImage = a.published_at
              ? `${IMAGE_URL}/${a.published_at.slice(0, 7).replace("-", "/")}/${a.bigimage}`
              : "/fallback.jpg";
            return {
              ...a,
              kategoris: a.kategoris?.toLowerCase() || "news",
              imageUrl: relatedImage,
            };
          });

        setRelatedArticles(related);
      } catch (err) {
        console.error("Error fetching article:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Memuat artikel...</p>
      </main>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/404" replace />;
  }

  const style = categoryStyles[article.kategoris] || categoryStyles.default;

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-[55vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${article.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="container mx-auto px-6 lg:px-20 pb-12 text-white">
            <span
              className={`inline-block ${style.bg} ${style.text} text-xs font-bold px-4 py-1 rounded-full uppercase`}
            >
              {article.kategoris}
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold font-serif leading-tight drop-shadow-lg">
              {article.judul}
            </h1>
            {/* ✨ DIPERBAIKI: Menampilkan nama langsung dari article.penulis */}
            <p className="mt-4 text-gray-300 text-sm">
              Oleh <span className="font-semibold">{article.penulis || "-"}</span>
              <span className="mx-2">•</span>
              {new Date(article.published_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Konten */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Isi Artikel */}
            <article
              className="lg:w-2/3 prose prose-lg max-w-none leading-relaxed text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.isi }}
            />

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-28">
                <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b-2 border-accent">
                  Baca Juga
                </h3>
                <div className="space-y-6">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((related) => {
                      const relStyle =
                        categoryStyles[related.kategoris] || categoryStyles.news;
                      return (
                        <Link
                          to={`/artikel/${related.slug}`}
                          key={related.id}
                          className="flex items-center space-x-4 group hover:bg-gray-50 rounded-lg p-2 transition"
                        >
                          <img
                            src={related.imageUrl}
                            className="w-28 h-20 object-cover rounded-lg flex-shrink-0"
                            alt={related.judul}
                          />
                          <div>
                            <span
                              className={`text-xs font-semibold uppercase ${relStyle.text}`}
                            >
                              {related.kategoris}
                            </span>
                            <h4 className="font-bold text-gray-800 group-hover:text-primary transition line-clamp-2">
                              {related.judul}
                            </h4>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Tidak ada artikel lain.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticleDetail;

