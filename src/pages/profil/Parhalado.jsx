import React, { useEffect, useState } from "react";

// Ambil URL API dari environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Parhalado() {
  // --- State untuk menyimpan data dari API ---
  const [parhaladoList, setParhaladoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Helper untuk format tanggal ---
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    // Opsi format: "01 Jan 2022"
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // --- 1. useEffect untuk Fetch Data ---
  useEffect(() => {
    const fetchParhalado = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/parhalado`);
        
        if (!res.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        
        const json = await res.json();
        setParhaladoList(json.data || []); 
        setError(null);

      } catch (err) {
        console.error("Error fetching parhalado:", err);
        setError("Tidak dapat memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchParhalado();
  }, []); 

  
  // --- 2. useEffect untuk Animasi ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0 }
    );

    const elements = document.querySelectorAll(".will-animate");
    if (elements.length > 0) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [parhaladoList]); 

  
  // --- 3. useEffect untuk Pencarian ---
  useEffect(() => {
    const input = document.getElementById("search-input");
    const cards = document.querySelectorAll(".member-card"); 
    const noResults = document.getElementById("no-results");

    const handleSearch = () => {
      if (!input) return;
      const term = input.value.toLowerCase();
      let found = false;
      
      cards.forEach((card) => {
        const name = card.dataset.name.toLowerCase();
        const visible = name.includes(term);
        card.style.display = visible ? "block" : "none";
        if (visible) found = true;
      });
      
      if (noResults) {
        noResults.style.display = found ? "none" : "block";
      }
    };

    input?.addEventListener("input", handleSearch);
    return () => input?.removeEventListener("input", handleSearch);
  }, [parhaladoList]);


  // --- Render Komponen ---
  return (
    <main className="bg-gray-100 font-sans">
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/1e3a8a/ffffff?text=Parhalado')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate opacity-0 translate-y-10 transition">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Daftar Parhalado</h1>
            <p className="mt-4 text-lg">Pilar Pelayanan dan Kepemimpinan Jemaat</p>
          </div>
        </div>
      </section>

      {/* Konten */}
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          {/* Pencarian */}
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
                id="search-input"
                placeholder="Cari nama parhalado..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#021f6e] shadow-sm"
              />
            </div>
          </div>

          {/* --- Tampilan Loading & Error --- */}
          {loading && (
            <p className="text-center text-gray-500 text-lg">
              Memuat data parhalado...
            </p>
          )}

          {error && (
            <p className="text-center text-red-500 text-lg">
              {error}
            </p>
          )}

          {/* --- Grid Parhalado --- */}
          {!loading && !error && (
            <div
              id="parhalado-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {parhaladoList.map((item, i) => {
                const periode = `${formatDate(item.tgl_pengangkatan)} - ${formatDate(item.tgl_selesai)}`;
                const initials = item.nama_parhalado
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2) 
                  .toUpperCase();
             
                  // 1. Logika untuk status badge (jika 'Aktif' tampilkan UPPERCASE di UI)
                  const rawStatus = item.status || "Tidak Aktif";
                  const isAktif = rawStatus.toLowerCase() === "aktif";
                  const status = isAktif ? rawStatus.toUpperCase() : rawStatus;

                  // 2. Kelas untuk badge (mengadaptasi dari Panitia.jsx)
                  const statusBadgeClasses = [
                    "absolute top-28 left-1/2 -translate-x-1/2", // Posisi: 'top-28' (112px) karena avatar kita 'h-32' (128px)
                    "text-xs font-semibold px-4 py-1 rounded-full border-2 border-white shadow-md",
                    isAktif
                      ? "bg-green-800 text-white" // Hijau untuk Aktif
                      : "bg-gray-500 text-white" // Abu-abu untuk lainnya
                  ].join(" ");
                  
                return (
                  <div
                    key={item.nama_parhalado + i} 
                    data-name={item.nama_parhalado} 
                    style={{ transitionDelay: `${i * 100}ms` }}
                    // Kelas 'card-border-wrap' untuk hover CSS
                    className="relative will-animate member-card card-border-wrap bg-white rounded-xl shadow-lg p-6 text-center transform transition hover:-translate-y-2 opacity-0 translate-y-5"
                  >
                    
                    {/* ✨ 3. Struktur HTML disesuaikan seperti Panitia.jsx ✨ */}
                    <div className="relative">
                      {/* Avatar (dengan margin-bottom) */}
                      <div className="flex justify-center mb-6"> 
                        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-indigo-300 text-indigo-900 font-bold text-4xl shadow-md border-4 border-indigo-100">
                          {initials || "-"}
                        </div>
                      </div>

                      {/* Badge Status (diposisikan 'absolute' relatif ke div di atas) */}
                      <span className={statusBadgeClasses}>
                        {status}
                      </span>
                    </div>
                    
                    {/* 4. Konten nama (dengan margin-top) */}
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-primary">{item.nama_parhalado}</h3>
                      <p className="text-gray-500 font-semibold mt-1">{item.nama_pelayanan}</p>
                      <p className="text-gray-500 text-sm">Wilayah Wijk {item.wilayah_wijk}</p>
                    </div>
                    
                    {/* 5. Periode (Masa Aktif) */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-400 font-semibold tracking-wide">MASA AKTIF</p>
                      <p className="text-sm text-gray-700 font-medium">{periode}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tampilan "No Results" untuk pencarian */}
          <p id="no-results" className="text-center text-gray-500 mt-12 hidden">
            Tidak ada parhalado yang cocok dengan pencarian Anda.
          </p>
          
          {/* Tampilan jika data API kosong */}
          {!loading && !error && parhaladoList.length === 0 && (
             <p className="text-center text-gray-500 mt-12">
               Saat ini belum ada data parhalado yang tersedia.
             </p>
          )}

        </div>
      </section>
    </main>
  );
}