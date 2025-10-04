// src/pages/Panitia.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';

const TABS = [
  { id: 'oikumene', label: 'Oikumene Inklusif' },
  { id: 'pembangunan', label: 'Pembangunan' },
  { id: 'hut', label: 'HUT Gereja' },
  { id: 'gotilon', label: 'Pesta Gotilon' },
  { id: 'natal', label: 'Natal Umum' },
];

// Dummy data awal; silakan ganti dengan data nyata.
const dataPanitia = {
  oikumene: [
    { nama: 'Nama Lengkap Anggota Satu', telp: '0812-3456-7890', aktif: '01 Jan 2024 - 31 Des 2026' },
    { nama: 'Nama Lengkap Anggota Dua', telp: '0812-3456-7891', aktif: '01 Jan 2024 - 31 Des 2026' },
  ],
  pembangunan: [
    { nama: 'Nama Panitia Pembangunan', telp: '0898-7654-3210', aktif: '15 Feb 2023 - 14 Feb 2027' },
  ],
  hut: [
    { nama: 'Nama Panitia HUT', telp: '0811-2233-4455', aktif: '01 Mar 2025 - 30 Sep 2025' },
  ],
  gotilon: [],
  natal: [],
};

const MemberCard = ({ item, delay = 0 }) => (
  <div
    className="member-card will-animate bg-white p-6 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
    style={{ transitionDelay: `${delay}ms` }}
    data-name={item.nama}
  >
    <img
      src="https://placehold.co/400x400/a5b4fc/1e1b4b?text=Foto"
      alt={item.nama}
      className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
    />
    <h3 className="text-xl font-bold text-primary">{item.nama}</h3>
    <p className="text-gray-600 mt-1">{item.telp}</p>
    <div className="mt-4 pt-4 border-t border-gray-200">
      <p className="text-xs text-gray-500 font-medium">MASA JABATAN</p>
      <p className="text-sm font-semibold text-gray-700">{item.aktif}</p>
    </div>
  </div>
);

export default function Panitia() {
  const [active, setActive] = useState('oikumene');
  const [keyword, setKeyword] = useState('');
  const containerRef = useRef(null);

  const items = useMemo(() => dataPanitia[active] || [], [active]);
  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return items;
    return items.filter((m) => m.nama.toLowerCase().includes(q));
  }, [items, keyword]);

  // IntersectionObserver lokal untuk animasi .will-animate
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll('.will-animate');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active, filtered.length]);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/6366f1/ffffff?text=Tim+Pelayanan')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Kepanitiaan</h1>
            <p className="mt-4 text-lg">Melayani Bersama dalam Satu Tubuh Kristus</p>
          </div>
        </div>
      </section>

      {/* Tabs + Search */}
      <section className="py-20">
        <div className="container mx-auto px-6" ref={containerRef}>
          {/* Search */}
          <div className="mb-12 will-animate">
            <div className="relative max-w-lg mx-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari nama anggota..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gray-300 will-animate">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`tab-button font-semibold py-3 px-6 border-b-2 border-transparent transition-all duration-300 text-gray-500 hover:text-primary ${
                  active === t.id ? 'active text-primary border-primary' : ''
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {items.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              Belum ada data untuk panitia {TABS.find((t) => t.id === active)?.label}.
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full mt-8">
              Tidak ada anggota yang cocok dengan pencarian Anda.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((item, i) => (
                <MemberCard key={`${active}-${i}`} item={item} delay={i * 100} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
