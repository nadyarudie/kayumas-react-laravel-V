// src/pages/JemaatMeninggal.jsx

import React from 'react';

const deceasedData = [
    {
        name: 'Bapak T. M. Lumbantobing',
        lifespan: 'Lahir: 10 Mei 1945 - Wafat: 22 September 2025',
        image: 'https://placehold.co/400x400/6b7280/ffffff?text=In+Memoriam'
    }
];

const JemaatMeninggal = () => {
    return (
        <main>
            <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/4b5563/ffffff?text=Dalam+Kenangan')" }}>
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-center text-white will-animate">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif">Berita Duka Cita</h1>
                        <p className="mt-4 text-lg">"Aku telah mengakhiri pertandingan yang baik, aku telah mencapai garis akhir..." (2 Timotius 4:7a)</p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="max-w-4xl mx-auto flex flex-col gap-12">
                        {deceasedData.map((person, index) => (
                            <div key={index} className="will-animate bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8">
                                <img src={person.image} alt="In Memoriam" className="w-40 h-40 rounded-full flex-shrink-0 border-4 border-gray-200 shadow-md" />
                                <div className="flex-grow text-center md:text-left">
                                    <p className="text-gray-500">Telah berpulang ke Rumah Bapa di Surga</p>
                                    <h3 className="text-3xl font-bold text-primary my-2">{person.name}</h3>
                                    <p className="font-semibold text-gray-600">{person.lifespan}</p>
                                    <hr className="my-4" />
                                    <p className="text-gray-700">Segenap jemaat dan parhalado HKBP Kayu Mas turut berdukacita yang mendalam atas kepergian beliau. Kiranya Tuhan memberikan kekuatan dan penghiburan bagi keluarga yang ditinggalkan.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default JemaatMeninggal;