// src/pages/GaleriFoto.jsx

import React, { useState, useMemo } from 'react';

// Contoh data untuk galeri foto (sesuaikan dengan data Anda)
const photosData = [
    { id: 1, thumb: 'https://placehold.co/600x400/fde047/ffffff?text=Paskah+1', full: 'https://placehold.co/800x600/fde047/ffffff?text=Paskah+1', description: "Perayaan Paskah bersama jemaat Wijk 1", date: "2025-04" },
    { id: 2, thumb: 'https://placehold.co/600x400/be123c/ffffff?text=Natal+1', full: 'https://placehold.co/800x600/be123c/ffffff?text=Natal+1', description: "Ibadah malam Natal yang khidmat", date: "2024-12" },
    { id: 3, thumb: 'https://placehold.co/600x400/0ea5e9/ffffff?text=HUT+1', full: 'https://placehold.co/800x600/0ea5e9/ffffff?text=HUT+1', description: "Pemotongan kue HUT Gereja ke-50", date: "2024-08" },
    { id: 4, thumb: 'https://placehold.co/600x400/facc15/ffffff?text=Paskah+2', full: 'https://placehold.co/800x600/facc15/ffffff?text=Paskah+2', description: "Lomba mencari telur Paskah anak-anak", date: "2025-04" },
    { id: 5, thumb: 'https://placehold.co/600x400/9f1239/ffffff?text=Natal+2', full: 'https://placehold.co/800x600/9f1239/ffffff?text=Natal+2', description: "Pementasan drama Natal oleh remaja", date: "2024-12" },
    { id: 6, thumb: 'https://placehold.co/600x400/0284c7/ffffff?text=HUT+2', full: 'https://placehold.co/800x600/0284c7/ffffff?text=HUT+2', description: "Paduan suara saat perayaan HUT Gereja", date: "2024-08" },
];

const GaleriFoto = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [lightboxImage, setLightboxImage] = useState(null);

    const filteredPhotos = useMemo(() => {
        return photosData.filter(photo => {
            const dateMatch = !selectedDate || photo.date === selectedDate;
            const searchMatch = photo.description.toLowerCase().includes(searchTerm.toLowerCase());
            return dateMatch && searchMatch;
        });
    }, [searchTerm, selectedDate]);

    const openLightbox = (photo) => setLightboxImage(photo);
    const closeLightbox = () => setLightboxImage(null);

    return (
        <>
            <main>
                <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/9ca3af/ffffff?text=Momen+Berharga')" }}>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white will-animate">
                            <h1 className="text-5xl md:text-7xl font-bold font-serif">Galeri Foto</h1>
                            <p className="mt-4 text-lg">Menyimpan Kenangan dalam Bingkai</p>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-6">
                        {/* INI BAGIAN FILTER YANG HILANG */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-12 will-animate">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></span>
                                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Cari deskripsi foto..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"/>
                                </div>
                                <div className="relative">
                                    <input type="month" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white appearance-none"/>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></span>
                                </div>
                            </div>
                        </div>

                        <div id="photo-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {filteredPhotos.map(photo => (
                                <div key={photo.id} className="gallery-item group relative rounded-lg overflow-hidden cursor-pointer aspect-w-1 aspect-h-1" onClick={() => openLightbox(photo)}>
                                    <img src={photo.thumb} alt={photo.description} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                                    <div className="overlay absolute inset-0 bg-black/60 flex items-end p-4"><p className="text-white text-sm font-semibold">{photo.description}</p></div>
                                </div>
                            ))}
                        </div>

                        {filteredPhotos.length === 0 && (
                            <p className="text-center text-gray-500 mt-12">Tidak ada foto yang cocok dengan kriteria pencarian Anda.</p>
                        )}
                    </div>
                </section>
            </main>

            {lightboxImage && (
                <div id="lightbox" className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <img src={lightboxImage.full} alt={lightboxImage.description} className="max-w-full max-h-[85vh] rounded-lg"/>
                        <p className="text-white text-center mt-3 text-lg font-medium">{lightboxImage.description}</p>
                    </div>
                    <button id="lightbox-close" className="absolute top-6 right-6 text-white text-5xl font-light" onClick={closeLightbox}>&times;</button>
                </div>
            )}
        </>
    );
};

export default GaleriFoto;