// src/pages/VisiMisi.jsx

import React from 'react';

// Data untuk kartu misi, sekarang ditambahkan 'title'
const missions = [
  { title: "Ibadah & Persekutuan", text: "Beribadah kepada Allah Tri Tunggal dan bersekutu dengan saudara seiman.", delay: "100ms", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { title: "Pendidikan Jemaat", text: "Mendidik jemaat menjadi anak Allah dan warga negara yang baik.", delay: "200ms", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
  { title: "Pekabaran Injil", text: "Mengabarkan Injil kepada yang belum mengenal Kristus dan yang menjauh dari gereja.", delay: "300ms", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.95l.007-.005a2 2 0 012.822 0l1.428 1.428a2 2 0 002.828 0l1.42-1.42a2 2 0 012.824 0l.006.006M12 12a2 2 0 100-4 2 2 0 000 4z" /> },
  { title: "Pesan Kenabian", text: "Mendoakan dan menyampaikan pesan kenabian kepada masyarakat dan Negara.", delay: "400ms", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
  { title: "Pelayanan Budaya", text: "Menggarami dan menerangi budaya Batak, Indonesia dan Global dengan Injil.", delay: "500ms", icon: <><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></> },
  { title: "Diakonia Sosial", text: "Memulihkan harkat martabat orang kecil melalui pendidikan, kesehatan, dan pemberdayaan ekonomi.", delay: "600ms", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /> },
  { title: "Kerjasama & Dialog", text: "Membangun kerjasama antar gereja dan dialog lintas agama.", delay: "700ms", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /> },
  { title: "Penatalayanan", text: "Mengembangkan penatalayanan dan melaksanakan pembangunan gereja serta lingkungan hidup.", delay: "800ms", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /> },
];

const VisiMisi = () => {
    return (
        <main>
            {/* Hero Section */}
            <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/021f6e/ffffff?text=Menjadi+Berkat')" }}>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white will-animate">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif">Visi & Misi HKBP</h1>
                        <p className="mt-4 text-lg">Panggilan untuk Menjadi Berkat bagi Dunia</p>
                    </div>
                </div>
            </section>

            {/* Visi Section with Glassmorphism */}
            <section className="py-20 bg-cover bg-fixed" style={{ backgroundImage: "url('https://placehold.co/1920x1080/e0e7ff/374151?text=Latar+Visi')" }}>
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="will-animate bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center text-white border border-white/30">
                         <h2 className="text-2xl font-semibold text-gray-200 tracking-widest uppercase">Visi</h2>
                         <p className="mt-4 text-4xl md:text-6xl font-bold font-serif italic" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>"HKBP gabe pasu-pasu di portibi on"</p>
                         <div className="w-20 h-1 bg-accent mx-auto mt-6"></div>
                         <p className="mt-6 text-xl text-gray-100" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>(HKBP menjadi berkat bagi dunia)</p>
                    </div>
                </div>
            </section>
            
            {/* Misi Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center mb-16 will-animate">
                         <h2 className="text-2xl font-semibold text-gray-500 tracking-widest uppercase">Misi</h2>
                         <p className="mt-4 text-4xl md:text-5xl font-bold font-serif text-primary">Menjadikan Murid Kristus Pelaku Firman</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {missions.map((mission, index) => (
                            <div key={index} className="will-animate bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300" style={{ transitionDelay: mission.delay }}>
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-800 to-primary text-white mb-6 shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        {mission.icon}
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3">{mission.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{mission.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default VisiMisi;