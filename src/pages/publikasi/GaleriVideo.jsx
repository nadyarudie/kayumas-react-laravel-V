// src/pages/GaleriVideo.jsx
import React, { useState, useEffect, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const GaleriVideo = () => {
  const [playlistData, setPlaylistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVideoId, setModalVideoId] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    let cancelled = false;

    const fetchVideos = async () => {
      if (cancelled) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/videos/youtube`, { signal: ac.signal });
        
        if (!res.ok) {
          throw new Error('Gagal mengambil data video');
        }

        const json = await res.json();
        const arr = json.data || [];
        
        const videos = arr
          .map((v) => {
            // Extract video ID from YouTube URL
            const match = (v.youtube_url || '').match(
              /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
            );
            const videoId = match ? match[1] : '';
            
            if (!videoId) return null;
            
            return {
              videoId,
              title: v.judul || 'Video Tanpa Judul',
              date: v.created_at
                ? new Date(v.created_at).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : '',
              thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            };
          })
          .filter(Boolean);

        if (cancelled) return;
        
        setPlaylistData(videos);
        
        if (!videos.length) {
          setError('Tidak ada video yang bisa ditampilkan saat ini.');
        }
      } catch (err) {
        if (!cancelled) {
          setError('Gagal memuat video. Silakan coba lagi nanti.');
          console.error('Error fetching videos:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchVideos();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  // Filter
  const filteredVideos = useMemo(() => {
    const year = selectedDate ? selectedDate.split('-')[0] : '';
    return playlistData.filter((v) => {
      const dateMatch = !selectedDate || (v.date || '').includes(year);
      const searchMatch = (v.title || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return dateMatch && searchMatch;
    });
  }, [playlistData, searchTerm, selectedDate]);

  const openModal = (id) => setModalVideoId(id);
  const closeModal = () => setModalVideoId(null);

  // Style untuk keyframes
  const keyframes = `
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
    }
    .animate-fade-in-up {
      opacity: 0;
      animation: fade-in-up 0.6s ease-out forwards;
    }
  `;

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Memuat video...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-600 text-xl">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{keyframes}</style>

      <main className="bg-gray-50">
        <section
          className="relative h-80 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://placehold.co/1920x1080/4f46e5/ffffff?text=Kisah+Pelayanan')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/80 to-blue-600/70 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-5xl md:text-7xl font-bold font-serif animate-fade-in-up">
                Galeri Video
              </h1>
              <p
                className="mt-4 text-lg animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Menyaksikan Iman dan Pelayanan dalam Gerak
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-12 -mt-32 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari judul video..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="month"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white appearance-none"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, i) => (
                <div
                  key={video.videoId}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100 + 500}ms` }}
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() => openModal(video.videoId)}
                  >
                    <div className="overflow-hidden aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-indigo-700 line-clamp-2 h-14">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {!loading && filteredVideos.length === 0 && (
              <p className="text-center text-gray-500 mt-12 text-lg">
                Tidak ada video yang ditemukan.
              </p>
            )}
          </div>
        </section>
      </main>

      {modalVideoId && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-black w-full max-w-4xl aspect-video relative rounded-lg shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
            style={{ animationDelay: '0.1s' }}
          >
            <button
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 text-white bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center hover:bg-red-600 transition-colors"
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0&modestbranding=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default GaleriVideo;