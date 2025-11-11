// src/pages/publikasi/GaleriDetail.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Pastikan Link diimpor

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

export default function GaleriDetail() {
  const { id } = useParams();

  const [photos, setPhotos] = useState([]);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Panggil Endpoint C untuk info album
        const albumInfoRes = await fetch(`${API_URL}/gallery/${id}`);
        if (!albumInfoRes.ok) throw new Error("Gagal memuat info album");
        const albumData = await albumInfoRes.json();
        setAlbumInfo(albumData);

        // 2. Panggil Endpoint B untuk daftar foto
        const photosRes = await fetch(`${API_URL}/gallery/${id}/items`);
        if (!photosRes.ok) throw new Error("Gagal memuat foto");
        const photosData = await photosRes.json();
        
        const photoArray = photosData.data || photosData;
        if (Array.isArray(photoArray)) {
          setPhotos(photoArray);
        } else {
          setPhotos([]);
        }

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  // Filter foto berdasarkan pencarian dan tanggal
  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const dateMatch = !selectedDate || photo.tanggal_upload.slice(0, 7) === selectedDate;
      const searchMatch = (photo.catatan || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (photo.judul || '').toLowerCase().includes(searchTerm.toLowerCase());
      return dateMatch && searchMatch;
    });
  }, [searchTerm, selectedDate, photos]);

  const openLightbox = (photo) => setLightboxImage(photo);
  const closeLightbox = () => setLightboxImage(null);

  // Next / Prev navigation within current filteredPhotos
  const showNext = (e) => {
    e && e.stopPropagation();
    if (!lightboxImage) return;
    const len = filteredPhotos.length;
    if (len === 0) return;
    const idx = filteredPhotos.findIndex(p => p.id_foto === lightboxImage.id_foto);
    if (idx === -1) return;
    const next = filteredPhotos[(idx + 1) % len];
    setLightboxImage(next);
  };

  const showPrev = (e) => {
    e && e.stopPropagation();
    if (!lightboxImage) return;
    const len = filteredPhotos.length;
    if (len === 0) return;
    const idx = filteredPhotos.findIndex(p => p.id_foto === lightboxImage.id_foto);
    if (idx === -1) return;
    const prev = filteredPhotos[(idx - 1 + len) % len];
    setLightboxImage(prev);
  };

  return (
    <>
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
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes zoomIn {
        from {
        opacity: 0;
        transform: scale(0.9);
        }
        to {
        opacity: 1;
        transform: scale(1);
        }
      }
      `}</style>

      <main>
      
        <section 
          className="relative h-80 bg-gradient-to-br from-blue-500 via-blue-100 to-white-100 text-white flex items-center justify-center"
        >
          <div className="text-center px-6 bg-black/40 p-4 rounded-lg backdrop-blur-sm">
          <h1 className="text-5xl md:text-7xl font-bold font-serif drop-shadow-lg">
            {loading ? "Galeri Foto" : albumInfo?.judul || "Galeri Foto"}
          </h1>
          <p className="mt-4 text-lg line-clamp-2 max-w-2xl mx-auto drop-shadow-md">
            {albumInfo?.catatan}
          </p>
          
          {/* Info Album */}
          {albumInfo && (
            <div className="mt-1 flex items-center justify-center gap-6 text-base md:text-lg text-gray-200 drop-shadow-md font-semibold">
           
            <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>{photos.length} Foto</span>
            </div>
            </div>
          )}
          </div>
        </section>

        <section className="py-12 bg-gray-100 min-h-screen">
          <div className="container mx-auto px-6">
          
          {/* Tombol Kembali ke Galeri Album */}
        <div className="mb-8 flex justify-center">
          <Link 
          to="/galeri"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105"
          >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Kembali ke Galeri Album
          </Link>
        </div>

        {/* Filter */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            </span>
            <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari deskripsi foto..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
          
          {/* Date Filter */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            </span>
            <input
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none bg-white"
            />
            {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            )}
          </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
          <div className="inline-block w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-600 text-lg">Memuat foto...</p>
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

        {/* Grid Foto */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => {
            const gradients = [
         
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
            <div
              key={photo.id_foto}
              onClick={() => openLightbox(photo)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}></div>
              
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
              <img
                src={photo.url_thumbnail}
                alt={photo.judul || photo.catatan}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-overlay opacity-50"
              />
              
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern id={`photo-pattern-${index}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="1.5" fill="white"/>
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill={`url(#photo-pattern-${index})`}/>
                </svg>
              </div>
              
              {/* Icon Eye di tengah */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/30 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                </div>
              </div>
              </div>

              {/* Content Section */}
              <div className="relative p-4 bg-white/95 backdrop-blur-sm">
              <h3 className="font-bold text-base text-gray-800 line-clamp-2 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                {photo.judul || "Tanpa Judul"}
              </h3>
              
              {photo.catatan && (
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {photo.catatan}
                </p>
              )}
              
              <div className="flex items-center gap-2 text-gray-500 text-xs pt-2 border-t border-gray-200">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{formatDate(photo.tanggal_upload)}</span>
              </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
            );
          })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="text-center py-20">
          <svg className="w-32 h-32 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p className="text-gray-500 text-xl mb-2">
            {searchTerm || selectedDate ? "Tidak ada foto yang cocok" : "Album ini belum memiliki foto"}
          </p>
          {(searchTerm || selectedDate) && (
            <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDate('');
            }}
            className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
            Reset Filter
            </button>
          )}
          </div>
        )}
        </div>
      </section>
      </main>

      {/* Lightbox */}
      {lightboxImage && (
      <div 
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={closeLightbox}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <div 
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'zoomIn 0.4s ease-out' }}
        >
        {/* Image */}
        <img
          src={lightboxImage.url_besar}
          alt={lightboxImage.judul || lightboxImage.catatan}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
        
        {/* Info Box */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">
          {lightboxImage.judul || "Tanpa Judul"}
          </h3>
          {lightboxImage.catatan && (
          <p className="text-gray-200 mb-4">{lightboxImage.catatan}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-300">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span>{formatDate(lightboxImage.tanggal_upload)}</span>
          </div>
        </div>
        </div>
        
        {/* Close Button */}
        <button
        onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110"
        aria-label="Tutup"
        >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        </button>

        {/* Prev Button */}
        <button
          onClick={showPrev}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110"
          aria-label="Sebelumnya"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={showNext}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110"
          aria-label="Berikutnya"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      )}
    </>
    );
}