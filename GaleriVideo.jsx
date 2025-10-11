// src/pages/GaleriVideo.jsx
import React, { useState, useEffect, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const extractChannelRef = (url) => {
  if (!url) return { handle: null, channelId: null };
  const mHandle = url.match(/youtube\.com\/@([^/]+)/i);
  if (mHandle) return { handle: mHandle[1], channelId: null };
  const mId = url.match(/youtube\.com\/channel\/([^/?]+)/i);
  if (mId) return { handle: null, channelId: mId[1] };
  return { handle: null, channelId: null };
};

const GaleriVideo = () => {
  const [playlistData, setPlaylistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVideoId, setModalVideoId] = useState(null);

  // ✅ Backup API fallback
  const fetchFromBackupAPI = async (signal) => {
    try {
      const res = await fetch(`${API_URL}/videos/youtube`, { signal });
      if (!res.ok) throw new Error('Backup gagal');
      const json = await res.json();
      const arr = json.data || [];
      return arr
        .map((v) => {
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
            thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          };
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    let cancelled = false;

    const fetchSafe = async (url) => {
      try {
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    };

    const load = async () => {
      if (cancelled) return;
      setLoading(true);
      setError(null);

      try {
        const chRes = await fetchSafe(`${API_URL}/videos/youtube/channel-youtube`);
        const { handle, channelId: chId } = extractChannelRef(chRes?.youtube_url || '');

        let channelId = chId || null;
        if (!channelId && handle && YOUTUBE_API_KEY) {
          const searchRes = await fetchSafe(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
              handle
            )}&key=${YOUTUBE_API_KEY}`
          );
          channelId = searchRes?.items?.[0]?.id?.channelId || null;
        }

        let videos = [];
        if (YOUTUBE_API_KEY && channelId) {
          const vidsRes = await fetchSafe(
            `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10&type=video`
          );
          videos =
            vidsRes?.items?.map((item) => ({
              videoId: item.id.videoId,
              title: item.snippet.title,
              date: new Date(item.snippet.publishedAt).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }),
              thumbnail:
                item.snippet.thumbnails?.medium?.url ||
                `https://img.youtube.com/vi/${item.id.videoId}/mqdefault.jpg`,
            })) || [];
        }

        // fallback ke backup
        if (!videos.length) videos = await fetchFromBackupAPI(ac.signal);

        if (cancelled) return;
        setPlaylistData(videos);
        if (!videos.length) setError('Tidak ada video yang bisa ditampilkan saat ini.');
      } catch (e) {
        if (cancelled) return;
        setError('Gagal memuat video.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // ✅ Jalankan fetch hanya sekali
    load();

    // cleanup agar StrictMode gak dobel fetch
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

  // ✅ UI (tidak diubah)
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
              <p className="text-gray-600">Memuat data YouTube...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <main>
        <section
          className="relative h-80 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://placehold.co/1920x1080/4f46e5/ffffff?text=Kisah+Pelayanan')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-7xl font-bold font-serif">
                Galeri Video
              </h1>
              <p className="mt-4 text-lg">
                Menyaksikan Iman dan Pelayanan dalam Gerak
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            {/* Search & Filter */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-12">
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="relative">
                  <input
                    type="month"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none"
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

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, i) => (
                <div
                  key={video.videoId}
                  className="group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div
                    className="relative cursor-pointer rounded-xl shadow-lg overflow-hidden"
                    onClick={() => openModal(video.videoId)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
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
                  <div className="pt-4 text-center">
                    <h3 className="text-lg font-bold text-primary">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {!loading && filteredVideos.length === 0 && (
              <p className="text-center text-gray-500 mt-12">
                Tidak ada video yang ditemukan.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Modal */}
      {modalVideoId && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-black w-full max-w-4xl aspect-video relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-5xl font-light"
              onClick={closeModal}
            >
              &times;
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0`}
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
