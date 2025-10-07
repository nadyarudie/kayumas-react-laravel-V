// src/pages/Wijk.jsx
import React, { useEffect, useMemo, useState } from 'react';

export default function Wijk() {
  const [activeId, setActiveId] = useState('1');

  // Data Wijk
  const wijkData = useMemo(
    () => ({
      '1': { name: 'Wijk 1', daerah: 'Pulo Gadung, Kayu Putih', kk: 50, sintua: [
        { name: 'St. A. Simanjuntak', telp: '0812-1111-1111' },
        { name: 'St. B. Panjaitan', telp: '0813-1111-1111' },
      ]},
      '2': { name: 'Wijk 2', daerah: 'Rawamangun, Utan Kayu', kk: 45, sintua: [
        { name: 'St. C. Siregar', telp: '0812-2222-2222' },
        { name: 'St. D. Lumbantobing', telp: '0813-2222-2222' },
      ]},
      '3': { name: 'Wijk 3', daerah: 'Jati, Pulomas', kk: 55, sintua: [
        { name: 'St. E. Nainggolan', telp: '0812-3333-3333' },
      ]},
      '4': { name: 'Wijk 4', daerah: 'Cipinang, Klender', kk: 60, sintua: [
        { name: 'St. F. Aritonang', telp: '0812-4444-4444' },
      ]},
      '5': { name: 'Wijk 5', daerah: 'Kelapa Gading Barat', kk: 40, sintua: [
        { name: 'St. G. Simatupang', telp: '0812-5555-5555' },
      ]},
      '6': { name: 'Wijk 6', daerah: 'Kelapa Gading Timur', kk: 48, sintua: [
        { name: 'St. H. Pasaribu', telp: '0812-6666-6666' },
      ]},
      '7': { name: 'Wijk 7', daerah: 'Sunter, Kemayoran', kk: 52, sintua: [
        { name: 'St. I. Manullang', telp: '0812-7777-7777' },
      ]},
      '8': { name: 'Wijk 8', daerah: 'Cempaka Putih, Senen', kk: 43, sintua: [
        { name: 'St. J. Marpaung', telp: '0812-8888-8888' },
      ]},
      '9': { name: 'Wijk Parserahan', daerah: 'Wilayah Khusus Parserahan', kk: 30, sintua: [
        { name: 'St. K. Sitorus', telp: '0812-9999-9999' },
      ]},
    }),
    []
  );

  // Posisi titik di peta
  const points = useMemo(
    () => ([
      { id: '1', label: '1', top: '20%', left: '30%' },
      { id: '2', label: '2', top: '35%', left: '50%' },
      { id: '3', label: '3', top: '50%', left: '25%' },
      { id: '4', label: '4', top: '65%', left: '45%' },
      { id: '5', label: '5', top: '25%', left: '70%' },
      { id: '6', label: '6', top: '45%', left: '80%' },
      { id: '7', label: '7', top: '70%', left: '65%' },
      { id: '8', label: '8', top: '80%', left: '30%' },
      { id: '9', label: 'P', top: '55%', left: '60%' },
    ]),
    []
  );

  // Animasi muncul (sesuai kelas will-animate/is-visible)
  useEffect(() => {
    const els = document.querySelectorAll('.will-animate');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const data = wijkData[activeId];

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('https://placehold.co/1920x1080/fbbf24/ffffff?text=Peta+Wilayah')" }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Peta Wilayah Wijk</h1>
            <p className="mt-4 text-lg">Menjangkau Setiap Jemaat dalam Persekutuan</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-screen-xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Map */}
            <div
              className="lg:col-span-2 relative will-animate bg-gray-200 rounded-lg overflow-hidden shadow-lg"
              style={{ height: 600 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIj48cGF0aCBmaWxsPSIjZjNmNGY2IiBkPSJNMCAwaDgwMHY2MDBIMHoiLz48cGF0aCBmaWxsPSIjZTBlN2ZmIiBkPSJNNzU2IDkwYy0yMyAyNC00NyA0MC04NiA0OGMtMTQgMy0yOCAxLTM5LTJjLTEzLTMtMjEtMTAtMjktMThjLTEyLTEzLTIxLTMzLTM2LTM5Yy0yMy05LTUwIDAtNjEgMTNjLTcgOC0xOCAxMS0yOCAxMGgtMWMtOC0xLTktMTEtMTUtMThjLTYtNi0xNS04LTIzLTdjLTEzIDAtMjcgNS0zOSA5Yy05IDMtMTggNS0yOCA0Yy0xOC0yLTMzLTEzLTQ5LTE3Yy0yMS02LTM2LTMtNTQgOGMtNiA0LTQgMTYgMiAyMmM5IDktMTYgNDEtNSA1M2MyIDIgMiAzIDQgNGMxMCAxMCAxNSA0MSAyNiA1MWMxMyAxMSA0NCAxNSA1OCAxMmMxMS0zIDEwLTIyIDIyLTI5YzcgLTQgMTQgLTUgMjEgLTdjMTEtMyAyMy0xIDM0IDJjMTcgNCAyOCA1IDQ0IDJjMTItMiAyNC0xNyAzOC0xNGMxMyAyIDI1IDEzIDM4IDE5YzE1IDcgMjggMTUgNDYgMTRjMTctMSAxNi0yMiAyNS0zM2M2LTcgMTUtOCAyMy02YzEzIDIgMTggMTQgMzEgMTFjMTEtMiAyMy0xNyAzNC0yMWMxNS02IDIyLTIgMzYgN2MxMCA2IDEzLTEzIDctMjBjLTEwLTEwLTI0LTEzLTM3LTE5Yy04LTQtMTQtMTAtMjQtMTFjLTctMS0xMS05LTUtMTVjNy04IDIwLTEwIDI5LTExczE0LTkgMjAtMTRjOC03IDE3LTEwIDI2LTJjMTMgMTEgMzEtMyA0MC0xMWM1MS00NiA0MC05OCAwLTEzN2MtNi01LTQgMTAtMTEgMTJjLTkgMy0xOCAwLTI3LTJjLTEyLTMtMTctMTYtMjktMTljLTExLTQtMjEgMC0zMSAxMGMtNyA2LTcgMTQtMTYgMTZ6Ii8+PC9zdmc+')",
                }}
              />

              {/* Points */}
              {points.map((p) => (
                <button
                  key={p.id}
                  className={[
                    'map-point absolute w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg',
                    activeId === p.id ? 'active' : '',
                  ].join(' ')}
                  style={{ top: p.top, left: p.left }}
                  onClick={() => setActiveId(p.id)}
                  aria-label={`Wijk ${p.label}`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Details */}
            <div className="will-animate" style={{ transitionDelay: '200ms' }}>
              <div id="wijk-details" className="bg-white p-6 rounded-lg shadow-lg h-full transition-opacity duration-300">
                {data && (
                  <div className="will-animate is-visible">
                    <h2 className="text-3xl font-bold font-serif text-primary mb-2">{data.name}</h2>
                    <div className="flex items-center text-gray-500 mb-6">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">{data.daerah}</span>
                    </div>

                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-indigo-800">Jumlah Kepala Keluarga</p>
                        <p className="text-3xl font-bold text-primary">{data.kk}</p>
                      </div>
                      <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-3">Sintua Wilayah</h3>
                      <div className="space-y-3">
                        {data.sintua.map((s) => (
                          <div key={s.telp} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-800">{s.name}</p>
                              <p className="text-sm text-gray-500">{s.telp}</p>
                            </div>
                            <a href={`tel:${s.telp}`} className="text-primary hover:text-blue-700" aria-label={`Telepon ${s.name}`}>
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

/* Tailwind helper (opsional, kalau belum ada) */
/* tambahkan di index.css kamu:
.nav-link { position:relative; padding-bottom:6px; }
.nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background-color: var(--accent-color); transition: width .3s; }
.nav-link:hover::after { width:100%; }
.map-point { transition: all .3s ease; cursor: pointer; }
.map-point.active { background-color: var(--accent-color); color:#fff; transform: scale(1.2); box-shadow:0 0 0 8px rgba(212,175,55,.4); animation: pulse 2s infinite; }
@keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(212,175,55,.7)} 70%{box-shadow:0 0 0 15px rgba(212,175,55,0)} 100%{box-shadow:0 0 0 0 rgba(212,175,55,0)} }
.will-animate { opacity:0; transform: translateY(40px); transition: opacity .8s ease, transform .8s ease; }
.is-visible { opacity:1; transform: translateY(0); }
*/
