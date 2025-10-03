import React, { useState } from 'react';

const playlistData = [
    { videoId: 'Jg7y-2sMocc', title: 'IBADAH MINGGU XI DUNG TRINITATIS', date: '18 Agu 2024' },
    { videoId: '5aLg-wAlJqA', title: 'IBADAH MINGGU X DUNG TRINITATIS', date: '11 Agu 2024' },
    { videoId: '00I1gg875CU', title: 'IBADAH MINGGU IX DO TRINITATIS', date: '04 Agu 2024' },
];

const YouTubeSection = () => {
    const [currentVideoId, setCurrentVideoId] = useState(playlistData[0].videoId);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 will-animate">
                    <h2 className="text-4xl font-bold text-primary mb-4 md:mb-0">HKBP Channel</h2>
                    <a href="https://www.youtube.com/@HKBPSolaGratiaKayuMas" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center text-white font-bold py-3 px-6 rounded-full text-base">
                        Kunjungi Channel Youtube
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </a>
                </div>
                <div className="will-animate lg:h-[420px] grid grid-cols-1 lg:grid-cols-3 lg:gap-10" style={{ transitionDelay: '150ms' }}>
                    <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-2xl h-full mb-8 lg:mb-0">
                        <iframe
                            id="youtube-player"
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col h-full">
                        <h3 className="font-bold text-xl mb-4 text-primary flex-shrink-0">Video Terbaru</h3>
                        <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2">
                            {playlistData.map((video) => (
                                <div
                                    key={video.videoId}
                                    className={`playlist-item flex items-center space-x-4 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 ${currentVideoId === video.videoId ? 'bg-gray-200' : ''}`}
                                    onClick={() => setCurrentVideoId(video.videoId)}
                                >
                                    <img src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} alt="Video thumbnail" className="w-32 rounded-md aspect-video object-cover flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-sm leading-tight text-gray-800">{video.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{video.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default YouTubeSection;