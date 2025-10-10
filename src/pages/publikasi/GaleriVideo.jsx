// src/pages/GaleriVideo.jsx

import React, { useState, useEffect, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Helper functions can stay outside the component because they don't depend on state or props
const extractChannelId = (channelUrl) => {
    const match = channelUrl.match(/youtube\.com\/@([^\\/]+)/);
    if (match) return match[1];
    const channelMatch = channelUrl.match(/youtube\.com\/channel\/([^\\/]+)/);
    if (channelMatch) return channelMatch[1];
    return null;
};

const GaleriVideo = () => {
    const [playlistData, setPlaylistData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVideoId, setModalVideoId] = useState(null);

    // This function will also be used inside useEffect
    const fetchFromBackupAPI = async () => {
        try {
            const response = await fetch(`${API_URL}/videos/youtube`);
            if (!response.ok) throw new Error('Gagal mengambil data dari backup API');
            const result = await response.json();
            
            if (result.data && Array.isArray(result.data)) {
                return result.data.map(item => {
                    let videoId = '';
                    if (item.youtube_url) {
                        const regex = /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/;
                        const match = item.youtube_url.match(regex);
                        if (match) videoId = match[1];
                    }
                    return {
                        videoId: videoId,
                        title: item.judul || 'Video Tanpa Judul',
                        date: item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
                        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                    };
                }).filter(video => video.videoId);
            }
            return [];
        } catch (err) {
            console.error('Backup API error:', err);
            return []; // Return empty array on error
        }
    };

    // Corrected useEffect to handle data fetching properly
    useEffect(() => {
        let isMounted = true; // Flag to track if component is still mounted

        const fetchData = async () => {
            let finalVideos = [];
            try {
                // setLoading is set outside the finally block to avoid a flash of content
                // if the component unmounts and remounts quickly.
                if (isMounted) {
                    setLoading(true);
                }

                // 1. Fetch channel URL
                const channelResponse = await fetch(`${API_URL}/videos/youtube/channel-youtube`);
                if (!channelResponse.ok) throw new Error('Gagal mengambil data channel');

                const channelData = await channelResponse.json();
                
                if (channelData && channelData.youtube_url) {
                    const channelHandle = extractChannelId(channelData.youtube_url);
                    if (channelHandle) {
                        // 3. Search for channel to get channel ID
                        const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelHandle}&key=${YOUTUBE_API_KEY}`);
                        const searchData = await searchResponse.json();

                        if (searchData.error) {
                            console.warn('YouTube API error (channel search):', searchData.error.message);
                            finalVideos = await fetchFromBackupAPI();
                        } else if (searchData.items && searchData.items.length > 0) {
                            const channelId = searchData.items[0].id.channelId;
                            // 4. Fetch videos from the channel
                            const videosResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10&type=video`);
                            const videosData = await videosResponse.json();

                            if (videosData.error) {
                                console.warn('YouTube API error (video search):', videosData.error.message);
                                finalVideos = await fetchFromBackupAPI();
                            } else if (videosData.items && videosData.items.length > 0) {
                                finalVideos = videosData.items.map(item => ({
                                    videoId: item.id.videoId,
                                    title: item.snippet.title,
                                    date: new Date(item.snippet.publishedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
                                    thumbnail: item.snippet.thumbnails.medium.url
                                }));
                            } else {
                                finalVideos = await fetchFromBackupAPI();
                            }
                        } else {
                            finalVideos = await fetchFromBackupAPI();
                        }
                    } else {
                        finalVideos = await fetchFromBackupAPI();
                    }
                } else {
                    finalVideos = await fetchFromBackupAPI();
                }
            } catch (err) {
                console.error('An error occurred during data fetching:', err);
                try {
                    finalVideos = await fetchFromBackupAPI(); // Try fallback on any error
                    if (finalVideos.length === 0) {
                        if(isMounted) setError(err.message);
                    }
                } catch (backupErr) {
                    if(isMounted) setError(backupErr.message);
                }
            } finally {
                if (isMounted) {
                    setPlaylistData(finalVideos);
                    setLoading(false);
                }
            }
        };

        fetchData();

        // The cleanup function runs when the component unmounts
        return () => {
            isMounted = false;
        };
    }, []); // Empty array ensures this runs ONLY on initial mount

    const filteredVideos = useMemo(() => {
        if (!playlistData) return [];

        const year = selectedDate ? selectedDate.split('-')[0] : '';
        return playlistData.filter(video => {
            const dateMatch = !selectedDate || (video.date || '').includes(year);
            const searchMatch = (video.title || '').toLowerCase().includes(searchTerm.toLowerCase());
            return dateMatch && searchMatch;
        });
    }, [playlistData, searchTerm, selectedDate]);

    const openModal = (videoId) => setModalVideoId(videoId);
    const closeModal = () => setModalVideoId(null);

    // --- JSX RENDER ---
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
                        {/* Error UI */}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <main>
                <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/4f46e5/ffffff?text=Kisah+Pelayanan')" }}>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white will-animate">
                            <h1 className="text-5xl md:text-7xl font-bold font-serif">Galeri Video</h1>
                            <p className="mt-4 text-lg">Menyaksikan Iman dan Pelayanan dalam Gerak</p>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-12 will-animate">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                {/* Search and Date Inputs */}
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></span>
                                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Cari judul video..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
                                </div>
                                <div className="relative">
                                    <input type="month" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none"/>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></span>
                                </div>
                            </div>
                        </div>

                        <div id="video-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredVideos.map((video, index) => (
                                <div key={video.videoId} className="video-card will-animate group" style={{ transitionDelay: `${index * 100}ms` }}>
                                    <div className="relative video-thumbnail cursor-pointer rounded-xl shadow-lg overflow-hidden" onClick={() => openModal(video.videoId)}>
                                        <img src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt={video.title} className="w-full transition-transform duration-300 group-hover:scale-110"/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent overlay"></div>
                                        <div className="absolute inset-0 flex items-center justify-center play-icon">
                                            <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full">
                                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 text-center">
                                        <h3 className="text-lg font-bold text-primary">{video.title}</h3>
                                        <p className="text-sm text-gray-500">{video.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!loading && filteredVideos.length === 0 && (
                             <p className="text-center text-gray-500 mt-12">Tidak ada video yang ditemukan.</p>
                        )}
                    </div>
                </section>
            </main>

            {/* Video Modal */}
            {modalVideoId && (
                <div id="video-modal" className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <div className="bg-black w-full max-w-4xl aspect-video relative" onClick={(e) => e.stopPropagation()}>
                        <button id="video-close" className="absolute -top-10 right-0 text-white text-5xl font-light" onClick={closeModal}>&times;</button>
                        <iframe id="video-iframe" className="w-full h-full" src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&rel=0`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default GaleriVideo;