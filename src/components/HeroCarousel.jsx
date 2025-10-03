import React, { useState, useEffect, useCallback } from 'react';

const slidesData = [
    {
        img: "https://kayumas.doseninformatika.com/galleries/2024/04/slide-01-04-2024.jpg",
        title: "Selamat Datang di HKBP Kayu Mas",
        subtitle: "Melayani dengan Kasih dan Sukacita"
    },
    {
        img: "https://kayumas.doseninformatika.com/galleries/2024/04/slide-02-04-2024.jpg",
        title: "Ibadah dan Persekutuan",
        subtitle: "Tumbuh Bersama dalam Iman"
    },
    {
        img: "https://kayumas.doseninformatika.com/galleries/2024/04/ini-judul-3-04-2024.jpg",
        title: "Kegiatan Pelayanan",
        subtitle: "Menjangkau dan Memberi Dampak"
    }
];

const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    }, []);
    
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <section id="hero-carousel" className="relative w-full h-[65vh] md:h-[90vh] overflow-hidden">
            <div className="carousel-inner w-full h-full">
                {slidesData.map((slide, index) => (
                    <div key={index} className={`carousel-item absolute w-full h-full ${index === currentIndex ? 'active' : ''}`}>
                        <img src={slide.img} className="w-full h-full object-cover" alt={slide.title} />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
                            <div className="container mx-auto px-12 md:px-20">
                                <div className={`max-w-xl text-white ${index === currentIndex ? 'hero-text' : ''}`}>
                                    <h2 className="text-4xl md:text-6xl font-bold font-serif mb-4 leading-tight" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.5)'}}>
                                        {slide.title}
                                    </h2>
                                    <div className="w-24 h-1 bg-accent mb-6"></div>
                                    <p className="text-lg md:text-xl text-gray-200" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/40 transition duration-300 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/40 transition duration-300 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
        </section>
    );
};

export default HeroCarousel;