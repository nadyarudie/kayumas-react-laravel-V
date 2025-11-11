// src/pages/publikasi/GaleriAlbum.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Ambil URL API dari environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL;

// Helper untuk format tanggal
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function GaleriAlbum() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/gallery`);
        if (!res.ok) throw new Error("Gagal memuat data galeri");
        
        const json = await res.json();
        const albumData = json.data || json;

        if (Array.isArray(albumData)) {
          setAlbums(albumData);
        } else {
          console.error("Format data API tidak terduga:", json);
          setAlbums([]);
        }
        
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const filteredAlbums = useMemo(() => {
    const q = searchTerm.toLowerCase();
    if (!q) return albums;
    return albums.filter(album => 
      album.judul.toLowerCase().includes(q) ||
      album.catatan.toLowerCase().includes(q)
    );
  }, [searchTerm, albums]);

  return (
    <main>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .album-card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative h-80 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://placehold.co/1920x1080/9ca3af/ffffff?text=Momen+Berharga')" }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Galeri Album</h1>
            <p className="mt-4 text-lg">Menyimpan Kenangan dalam Bingkai</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-6">
          
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-lg mx-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari judul album..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
              <p className="mt-6 text-gray-600 text-lg">Memuat album...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}

          {/* Grid Daftar Album */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAlbums.map((album, index) => {
                // Array warna gradasi untuk setiap card
                const gradients = [
                  'from-rose-400 to-pink-500',
                  'from-purple-400 to-indigo-500', 
                  'from-blue-400 to-cyan-500',
                  'from-teal-400 to-emerald-500',
                  'from-amber-400 to-orange-500',
                  'from-fuchsia-400 to-purple-500',
                  'from-sky-400 to-blue-500',
                  'from-violet-400 to-purple-500',
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                  <Link 
                    key={album.id_galeri} 
                    to={`/galeri/${album.id_galeri}`}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Gradient Background Card */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Image Container with Overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={album.url_cover_thumb || `https://placehold.co/600x400/9ca3af/ffffff?text=${album.judul.replace(' ', '+')}`} 
                        alt={album.judul} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-overlay opacity-40"
                      />
                      
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="2" fill="white"/>
                          </pattern>
                          <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${index})`}/>
                        </svg>
                      </div>
                      
                      {/* Icon Album di tengah */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 transform group-hover:scale-110 transition-all duration-500">
                          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-6 bg-white/95 backdrop-blur-sm">
                      <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
                        {album.judul}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {album.catatan}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          <span>{formatDate(album.tanggal_dibuat)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                          <span className="text-xs">Lihat</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent line with gradient */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredAlbums.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-32 h-32 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p className="text-gray-500 text-xl mb-2">
                {searchTerm ? "Album tidak ditemukan" : "Belum ada album galeri"}
              </p>
              {searchTerm && (
                <p className="text-gray-400 text-sm">
                  Coba kata kunci lain atau hapus pencarian
                </p>
              )}
            </div>
          )}

        </div>
      </section>
    </main>
  );
}