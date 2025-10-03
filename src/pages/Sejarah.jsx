// src/pages/Sejarah.jsx

import React, { useState } from 'react';

const impacts = [
    {
        id: 'pendidikan',
        title: 'Pendidikan',
        icon: <><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></>,
        image: 'https://placehold.co/600x400/021f6e/d4af37?text=Pendidikan',
        heading: 'Pelopor Pendidikan Modern',
        description: 'HKBP memelopori pendidikan modern di Tanah Batak, mendirikan ribuan sekolah dan Universitas HKBP Nommensen yang telah melahirkan banyak pemimpin nasional.',
    },
    {
        id: 'kesehatan',
        title: 'Kesehatan',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
        image: 'https://placehold.co/600x400/34d399/ffffff?text=Kesehatan',
        heading: 'Akses Kesehatan untuk Semua',
        description: 'Rumah sakit dan klinik HKBP melayani masyarakat tanpa memandang latar belakang, memberikan akses kesehatan yang vital, terutama di daerah pedesaan.',
    },
    {
        id: 'sosial',
        title: 'Sosial Budaya',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>,
        image: 'https://placehold.co/600x400/fbbf24/ffffff?text=Sosial+Budaya',
        heading: 'Harmoni Nilai dan Budaya',
        description: 'HKBP berperan aktif dalam pelestarian dan pengembangan budaya Batak yang selaras dengan nilai-nilai kristiani, serta berjuang dalam penanggulangan kemiskinan.',
    },
    {
        id: 'perdamaian',
        title: 'Perdamaian',
        icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.95l.007-.005a2 2 0 012.822 0l1.428 1.428a2 2 0 002.828 0l1.42-1.42a2 2 0 012.824 0l.006.006M12 12a2 2 0 100-4 2 2 0 000 4z"/>,
        image: 'https://placehold.co/600x400/60a5fa/ffffff?text=Perdamaian',
        heading: 'Membangun Jembatan Harmoni',
        description: 'HKBP berkomitmen untuk mempromosikan perdamaian dan rekonsiliasi melalui berbagai inisiatif dialog antar agama dan budaya untuk membangun harmoni sosial.',
    },
];

// Data untuk logo kerjasama ekumenis
const partners = [
    { name: 'PGI', logo: 'public/images/PGI.png' },
    { name: 'CCA', logo: 'public/images/CCA.png' },
    { name: 'WCC', logo: 'public/images/WCC.png' },
    { name: 'LWF', logo: 'public/images/LWF.png' },
    { name: 'UEM', logo: 'public/images/UEM.png' },
];

const Sejarah = () => {
    const [activeTab, setActiveTab] = useState('pendidikan');

    return (
        <main>
            {/* Hero Section */}
            <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/021f6e/d4af37?text=Gereja+HKBP+Pearaja')" }}>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white will-animate">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif">Sejarah HKBP</h1>
                        <p className="mt-4 text-lg">Akar Iman dan Pertumbuhan Gereja di Tanah Batak</p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="will-animate text-lg leading-relaxed text-gray-700 space-y-6">
                            <p>
                                Huria Kristen Batak Protestan (HKBP) resmi berdiri pada <strong className="text-primary">7 Oktober 1861</strong>, berawal dari pekabaran Injil oleh para misionaris Rheinische Missionsgesellschaft (RMG) dari Jerman. Empat misionaris pertama yang mengawali karya ini adalah Pendeta Carl Wilhelm Heine, Pendeta Johann Karl Klammer, Pendeta Friedrich Wilhelm Betz, dan Pendeta Gerrit van Asselt.
                            </p>
                            <div className="my-6 flex flex-col md:flex-row gap-8 items-center">
                                <img src="https://placehold.co/400x500/cccccc/333333?text=Dr.+L.I.+Nommensen" alt="Dr. Ludwig Ingwer Nommensen" className="w-full md:w-1/3 rounded-lg shadow-2xl object-cover" />
                                <p>
                                    Setahun kemudian, pada 1862, datanglah Pendeta <strong className="text-primary">Dr. Ludwig Ingwer Nommensen</strong> yang kemudian dikenal sebagai “Apostel Batak” karena jasanya dalam mengembangkan kekristenan di Tanah Batak. Melalui pendekatannya yang menghormati budaya lokal dan kemampuannya memahami masyarakat Batak, Nommensen berhasil menanamkan iman Kristen yang berakar kuat.
                                </p>
                            </div>
                            <p>
                                Gereja pertama didirikan di Huta Dame, Saitnihuta pada tahun 1864, diikuti dengan pendirian HKBP Pearaja yang kemudian menjadi pusat pelayanan HKBP hingga saat ini.
                            </p>
                            <blockquote className="border-l-4 border-accent bg-gray-50 p-6 my-4 italic text-gray-800 will-animate" style={{ transitionDelay: '200ms' }}>
                                "Pada tahun 1881, struktur gereja mulai dibentuk dengan pengangkatan Nommensen sebagai Ephorus pertama HKBP."
                            </blockquote>
                            <p>
                                Dari awal yang sederhana, HKBP telah berkembang menjadi gereja Protestan terbesar di Indonesia dan Asia Tenggara dengan lebih dari <strong className="text-primary">4,5 juta jemaat</strong> yang tersebar di seluruh Indonesia dan beberapa negara di luar negeri.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Impact Section Redesigned */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center mb-16 will-animate">
                         <h2 className="text-4xl md:text-5xl font-bold font-serif text-primary">Peran dan Dampak HKBP</h2>
                         <div className="w-20 h-1 bg-accent mx-auto mt-6"></div>
                    </div>
                    <div className="will-animate flex flex-col lg:flex-row gap-8 min-h-[450px]">
                        {/* Tombol Pemicu (Triggers) */}
                        <div className="flex lg:flex-col justify-start lg:w-1/3 space-y-2">
                            {impacts.map(impact => (
                                <button 
                                    key={impact.id}
                                    className={`w-full flex items-center text-left p-4 rounded-lg transition-all duration-300 transform
                                        ${activeTab === impact.id 
                                            ? 'bg-primary text-white shadow-lg scale-105' 
                                            : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-100'}`} 
                                    onClick={() => setActiveTab(impact.id)}
                                >
                                    <div className={`w-12 h-12 flex-shrink-0 mr-4 flex items-center justify-center rounded-full transition-colors duration-300 
                                        ${activeTab === impact.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            className={`h-6 w-6 transition-colors duration-300 ${activeTab === impact.id ? 'text-accent' : 'text-primary'}`} 
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            {impact.icon}
                                        </svg>
                                    </div>
                                    <span className="font-bold">{impact.title}</span>
                                </button>
                            ))}
                        </div>
                        {/* Panel Konten */}
                        <div className="lg:w-2/3 bg-white p-8 rounded-xl shadow-xl flex flex-col">
                            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                                {impacts.map(impact => (
                                    <img key={impact.id} src={impact.image} alt={impact.title} 
                                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 
                                        ${activeTab === impact.id ? 'opacity-100' : 'opacity-0'}`} />
                                ))}
                            </div>
                            <div className="relative flex-grow">
                                {impacts.map(impact => (
                                    <div key={impact.id} 
                                        className={`absolute top-0 left-0 w-full transition-opacity duration-500 
                                        ${activeTab === impact.id ? 'opacity-100' : 'opacity-0'}`}>
                                        <h3 className="text-3xl font-bold text-primary mb-4">{impact.heading}</h3>
                                        <p className="text-gray-600 leading-relaxed">{impact.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ecumenical Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 lg:px-20">
                     <div className="text-center mb-16 will-animate">
                           <h2 className="text-4xl md:text-5xl font-bold font-serif text-primary">Kerjasama Ekumenis</h2>
                           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Sebagai bagian dari gereja universal, HKBP aktif dalam berbagai jaringan ekumenis dan kerjasama antar gereja.</p>
                           <div className="w-20 h-1 bg-accent mx-auto mt-6"></div>
                     </div>
                     <div className="will-animate flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                        {partners.map(partner => (
                            <div key={partner.name} className="text-center group">
                                <img src={partner.logo} alt={`${partner.name} Logo`} className="h-20 mx-auto grayscale group-hover:grayscale-0 transition-all duration-300" />
                                <p className="mt-2 text-sm font-semibold text-gray-600">{partner.name}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </section>
        </main>
    );
};

export default Sejarah;