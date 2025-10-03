// src/pages/Wijk.jsx

import React, { useState, useEffect, useRef } from 'react';

// Data Wijk (tidak ada perubahan di sini)
const wijkData = [
    { id: 1, name: 'Wijk 1', members: [{ name: 'Keluarga Budi Santoso', phone: '0812-xxxx-xxxx' }, { name: 'Keluarga Maria Simanjuntak', phone: '0813-xxxx-xxxx' }] },
    { id: 2, name: 'Wijk 2', members: [] },
    { id: 3, name: 'Wijk 3', members: [] },
    { id: 4, name: 'Wijk 4', members: [] },
    { id: 5, name: 'Wijk 5', members: [] },
    { id: 6, name: 'Wijk 6', members: [] },
    { id: 7, name: 'Wijk 7', members: [] },
    { id: 8, name: 'Wijk 8', members: [] },
    { id: 'parserahan', name: 'Wijk Parserahan', members: [] },
];

// -- Komponen Accordion Item yang Diperbaiki --
const AccordionItem = ({ wijk, isOpen, onToggle }) => {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [isOpen]);

    return (
        <div className="accordion-item bg-white rounded-lg shadow-md overflow-hidden" id={`wijk-${wijk.id}`}>
            <button onClick={onToggle} className="accordion-header w-full flex justify-between items-center p-6 text-left">
                <h3 className="text-2xl font-bold text-primary">{wijk.name}</h3>
                <svg className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div
                ref={contentRef}
                className="accordion-content"
                style={{ maxHeight }}
            >
                <div className="p-6 border-t border-gray-200">
                    {wijk.members.length > 0 ? (
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 font-semibold">Nama Lengkap</th>
                                    <th className="p-3 font-semibold">Nomor Telepon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wijk.members.map((member, index) => (
                                    <tr key={index} className="border-b"><td className="p-3">{member.name}</td><td className="p-3">{member.phone}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Data untuk {wijk.name} akan ditampilkan di sini.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// -- Komponen Utama Wijk --
const Wijk = () => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    // Buka accordion berdasarkan URL hash
    useEffect(() => {
        const hash = window.location.hash.replace('#wijk-', '');
        if (hash) {
            setOpenAccordion(hash === 'parserahan' ? hash : parseInt(hash));
        }
    }, []);

    return (
        <main>
            <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/021f6e/ffffff?text=Keluarga+Besar')" }}>
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white will-animate is-visible">
                        <h1 className="text-5xl md:text-7xl font-bold font-serif">Informasi Wijk</h1>
                        <p className="mt-4 text-lg">Data Jemaat HKBP Kayu Mas per Wilayah Pelayanan</p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="max-w-4xl mx-auto space-y-4 will-animate is-visible">
                        {wijkData.map((wijk) => (
                            <AccordionItem
                                key={wijk.id}
                                wijk={wijk}
                                isOpen={openAccordion === wijk.id}
                                onToggle={() => toggleAccordion(wijk.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Wijk;