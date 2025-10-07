// src/pages/AnakLahir.jsx

import React from 'react';

const birthData = [
    {
        name: 'Samuel David Harianja',
        birthDate: '20 September 2025',
        parents: 'Keluarga Bpk. R. Harianja / Ibu S. Br. Simanjuntak',
        wijk: 3,
        image: 'https://placehold.co/400x400/c7d2fe/3730a3?text=Baby',
        color: 'text-indigo-600'
    },
    {
        name: 'Grace Angelia boru Situmorang',
        birthDate: '15 September 2025',
        parents: 'Keluarga Bpk. A. Situmorang / Ibu M. Br. Nainggolan',
        wijk: 5,
        image: 'https://placehold.co/400x400/fecdd3/881337?text=Baby',
        color: 'text-rose-600'
    }
];

const AnakLahir = () => {
    return (
        <main>
            <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/a5b4fc/ffffff?text=Anugerah+Terindah')" }}>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white will-animate">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif">Kabar Sukacita</h1>
                        <p className="mt-4 text-lg">Menyambut Kehadiran Anggota Jemaat Baru</p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {birthData.map((birth, index) => (
                            <div key={index} className="will-animate bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center" style={{ transitionDelay: `${index * 100}ms` }}>
                                <img src={birth.image} alt="Baby Photo" className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-white shadow-md" />
                                <h3 className="text-2xl font-bold text-primary mb-2">{birth.name}</h3>
                                <p className="text-gray-600">Telah lahir dengan selamat pada tanggal:</p>
                                <p className={`font-semibold text-lg my-2 ${birth.color}`}>{birth.birthDate}</p>
                                <p className="text-gray-500 text-sm">Putra/Putri terkasih dari</p>
                                <p className="font-semibold mt-1">{birth.parents}</p>
                                <p className="text-gray-500 text-sm">(Wijk {birth.wijk})</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AnakLahir;