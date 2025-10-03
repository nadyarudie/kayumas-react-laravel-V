// src/pages/GaleriVideo.jsx

import React, { useState, useMemo } from 'react';

// Contoh data untuk galeri video
const videosData = [
    { id: 1, videoId: '5aLg-wAlJqA', title: 'IBADAH MINGGU X DUNG TRINITATIS', date: '2024-08', dateFull: '11 Agustus 2024' },
    { id: 2, videoId: '00I1gg875CU', title: 'IBADAH MINGGU IX DO TRINITATIS', date: '2024-08', dateFull: '04 Agustus 2024' },
    { id: 3, videoId: 'zGg4H1gI39I', title: 'IBADAH MINGGU VIII DUNG TRINITATIS', date: '2024-07', dateFull: '28 Juli 2024' },
];

const GaleriVideo = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVideoId, setModalVideoId] = useState(null);

    const filteredVideos = useMemo(() => {
        return videosData.filter(video => {
            const dateMatch = !selectedDate || video.date === selectedDate;
            const searchMatch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
            return dateMatch && searchMatch;
        });
    }, [searchTerm, selectedDate]);

    const openModal = (videoId) => setModalVideoId(videoId);
    const closeModal = () => setModalVideoId(null);

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
                                <div key={video.id} className="video-card will-animate group" style={{ transitionDelay: `${index * 100}ms` }}>
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
                                        <p className="text-sm text-gray-500">{video.dateFull}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredVideos.length === 0 && (
                             <p className="text-center text-gray-500 mt-12">Tidak ada video yang ditemukan untuk kriteria Anda.</p>
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