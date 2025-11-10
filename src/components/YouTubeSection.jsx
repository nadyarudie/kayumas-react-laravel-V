import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const YouTubeSection = () => {
    const [playlistData, setPlaylistData] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                            thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
                        };
                    })
                    .filter(Boolean);

                if (cancelled) return;
                
                setPlaylistData(videos);
                
                if (videos.length > 0) {
                    setCurrentVideoId(videos[0].videoId);
                } else {
                    setError('Tidak ada video yang bisa ditampilkan saat ini.');
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('Error fetching YouTube data:', err);
                    setError(err.message || 'Gagal memuat data');
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
                        <div className="text-center">
                            <div className="text-red-500 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-4">{error}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            HKBP Channel
                        </h2>
                        <p className="text-gray-600">Tonton video ibadah dan kegiatan gereja terbaru</p>
                    </div>
                    {currentVideoId && (
                        <a 
                            href={`https://www.youtube.com/watch?v=${currentVideoId}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-4 md:mt-0 inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            Tonton di YouTube
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Video Player */}
                    <div className="lg:col-span-2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ paddingBottom: '56.25%' }}>
                            {currentVideoId ? (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${currentVideoId}?rel=0`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                    <p className="text-white">Tidak ada video tersedia</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Playlist */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col max-h-[500px]">
                        <div className="flex items-center justify-between mb-6 flex-shrink-0">
                            <h3 className="font-bold text-xl text-gray-900">Video Unggulan</h3>
                            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                                {playlistData.length} Video
                            </span>
                        </div>
                        
                        {playlistData.length > 0 ? (
                            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                {playlistData.map((video) => (
                                    <div
                                        key={video.videoId}
                                        className={`group cursor-pointer p-3 rounded-xl transition-all duration-300 ${
                                            currentVideoId === video.videoId 
                                                ? 'bg-red-50 border-2 border-red-200 shadow-md' 
                                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                        }`}
                                        onClick={() => setCurrentVideoId(video.videoId)}
                                    >
                                        <div className="flex gap-3">
                                            <div className="relative flex-shrink-0">
                                                <img 
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-28 h-16 rounded-lg object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg">
                                                    <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-sm leading-tight text-gray-900 line-clamp-2 mb-2">
                                                    {video.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {video.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                <div className="text-center">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <p>Belum ada video</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default YouTubeSection;