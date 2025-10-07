// src/pages/JemaatSakit.jsx

import React from 'react';

const sickData = [
    { name: 'Ibu St. R. Br. Hutagalung', wijk: 1, info: 'Saat ini sedang dalam masa pemulihan di rumah setelah menjalani perawatan di rumah sakit. Mari kita doakan agar Tuhan memberikan kekuatan dan kesembuhan total.' },
    { name: 'Bapak O. P. Siahaan', wijk: 8, info: 'Sedang menjalani perawatan intensif di RS Persahabatan. Mohon dukungan doa dari seluruh jemaat untuk proses pengobatan dan pemulihannya.' }
];

const JemaatSakit = () => {
    return (
        <main>
            <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/d1d5db/4b5563?text=Doa+dan+Harapan')" }}>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white will-animate">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif">Mari Kita Doakan</h1>
                        <p className="mt-4 text-lg">"Sebab itu hendaklah kamu saling mendoakan, supaya kamu sembuh." (Yakobus 5:16a)</p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {sickData.map((person, index) => (
                            <div key={index} className="will-animate bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mr-4 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-primary">{person.name}</h3>
                                        <p className="text-sm text-gray-500">Wijk {person.wijk}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{person.info}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default JemaatSakit;