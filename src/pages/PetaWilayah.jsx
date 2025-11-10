// src/pages/Wijk.jsx
import React, { useEffect, useMemo, useState, useRef} from 'react';

export default function Wijk() {
  const [activeId, setActiveId] = useState('1');
  const mapRef = useRef(null);

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

  useEffect(() => {
    const scriptId = 'arcgis-components-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://js.arcgis.com/embeddable-components/4.33/arcgis-embeddable-components.esm.js';
      document.head.appendChild(script);
    }

    const handleMapSelect = (event) => {
      // This event fires when a user clicks a popup in the map
      const feature = event.detail.selectedFeature;
      if (feature && feature.attributes) {
       
        const wijkIdFromMap = feature.attributes.FIELD_NAME; 

        if (wijkIdFromMap && wijkData[String(wijkIdFromMap)]) {
          setActiveId(String(wijkIdFromMap));
        }
      }
    };

    const mapElement = mapRef.current;
    if (mapElement) {
      // The map component fires a custom DOM event named 'arcgis-embedded-map-popup-select'
      mapElement.addEventListener('arcgis-embedded-map-popup-select', handleMapSelect);
    }

    return () => {
      if (mapElement) {
        mapElement.removeEventListener('arcgis-embedded-map-popup-select', handleMapSelect);
      }
    };
  }, [wijkData]);

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
              <arcgis-embedded-map
                ref={mapRef}
                style={{ width: '100%', height: '100%' }} // Fills parent div
                item-id="7d0df3b2f8424ae390c98a40f63accc3"
                theme="dark"
                heading-enabled
                information-enabled
                share-enabled
                center="106.93148076171697,-6.231147410947232"
                scale="288895.277144"
                portal-url="https://www.arcgis.com"
              >
              </arcgis-embedded-map>
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
