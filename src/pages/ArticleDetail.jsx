// src/pages/ArticleDetail.jsx

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { articlesData } from '../data/articles'; // Impor data artikel

const ArticleDetail = () => {
    const { slug } = useParams(); // Mengambil 'slug' dari URL
    const article = articlesData.find(a => a.slug === slug); // Cari artikel yang cocok

    // Jika artikel tidak ditemukan, arahkan ke halaman 404
    if (!article) {
        return <Navigate to="/404" replace />;
    }
    
    // Filter untuk artikel terkait (selain yang sedang dibaca)
    const relatedArticles = articlesData.filter(a => a.slug !== slug).slice(0, 2);

    return (
        <main>
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url('${article.image}')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <div className="container mx-auto px-6 lg:px-20 pb-12 text-white">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">{article.category}</span>
                        <h1 className="mt-4 text-3xl md:text-5xl font-bold font-serif leading-tight">{article.title}</h1>
                        <p className="mt-4 text-gray-300">Oleh {article.author} | {article.date}</p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* dangerouslySetInnerHTML digunakan untuk merender string HTML dari data */}
                        <article 
                            className="lg:w-2/3 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        <aside className="lg:w-1/3">
                            <div className="sticky top-28">
                                <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b-2 border-accent">Baca Juga</h3>
                                <div className="space-y-6">
                                    {relatedArticles.map(related => (
                                        <Link to={`/artikel/${related.slug}`} key={related.id} className="flex items-center space-x-4 group">
                                            <img src={related.image} className="w-28 h-20 object-cover rounded-lg flex-shrink-0" alt={related.title} />
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">{related.category}</span>
                                                <h4 className="font-bold text-gray-800 group-hover:text-primary transition">{related.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
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