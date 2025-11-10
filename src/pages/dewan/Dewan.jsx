// src/pages/Dewan.jsx
import React, { useMemo, useState, useEffect } from "react";

// Ambil URL API dari environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL;

// --- Helper untuk format tanggal ---
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};


const MemberCard = ({ member }) => {
  const { nama_pengurus, jabatan, tgl_mulai, tgl_selesai } = member;
  
  // Buat Inisial (karena tidak ada 'photo' di API)
  const initials = nama_pengurus
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
    
  // Buat periode dari tgl_mulai dan tgl_selesai
  const period = `${formatDate(tgl_mulai)} - ${formatDate(tgl_selesai)}`;

  // Tentukan style badge berdasarkan jabatan (seperti di Panitia.jsx)
  const role = jabatan || "Anggota";
  const isKetua = role.toLowerCase() === 'ketua';
  const roleBadgeClasses = [
    "absolute top-20 left-1/2 -translate-x-1/2", // Posisi: 'top-20' (80px) karena avatar 'h-24' (96px)
    "text-xs font-semibold px-4 py-1 rounded-full border-2 border-white shadow-md",
    isKetua 
      ? "bg-indigo-500 text-white"  // Biru untuk Ketua (sesuai Panitia.jsx)
      : "bg-gray-400 text-white"   // Abu-abu untuk lainnya
  ].join(" ");

  return (
    // 'card-border-wrap' untuk hover
    <div className="member-card card-border-wrap relative bg-white p-6 rounded-lg shadow-lg text-center h-full">
      
      {/* ✨ 1. Struktur diubah seperti Panitia.jsx ✨ */}
      <div className="relative">
        
        {/* Avatar (dengan margin-bottom) */}
        {/* Avatar `h-24` (96px) */}
        <div className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white shadow-md bg-indigo-200 text-indigo-800 flex items-center justify-center text-3xl font-bold">
          {initials || "-"}
        </div>

        {/* Badge Jabatan (diposisikan 'absolute' relatif ke div di atas) */}
        {jabatan && (
          <span className={roleBadgeClasses}>
            {role}
          </span>
        )}
      </div>
      
      {/* ✨ 2. Konten nama (dengan margin-top) ✨ */}
      <div className="mt-4">
        <h3 className="name font-bold text-lg text-primary">{nama_pengurus}</h3>
      </div>
      
      {/* ✨ 3. Periode (Masa Aktif) ✨ */}
      <div className="period mt-3 pt-3 border-t border-gray-200">
        <p className="period-title text-xs text-gray-400 font-semibold">MASA AKTIF</p>
        <p className="period-date text-sm text-gray-600 font-medium">{period}</p>
      </div>
    </div>
  );
};


/**
 * Komponen Accordion yang bisa dibuka-tutup.
 * (Tidak ada perubahan di sini)
 */
const AccordionItem = ({ title, open, onToggle, children }) => (
  <div className="accordion-item bg-white rounded-lg shadow-md overflow-hidden">
    <button
      className="accordion-header w-full flex justify-between items-center p-6 text-left"
      onClick={onToggle}
    >
      <span className="text-xl font-bold text-primary">{title}</span>
      <svg
        className={`w-6 h-6 transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div 
      className="accordion-content overflow-hidden" 
      style={{ maxHeight: open ? "10000px" : 0, transition: "max-height .5s ease-in-out" }}
    >
      <div className="bg-gray-50 p-6 pt-4">{children}</div>
    </div>
  </div>
);

// =====================================================================
// 2. STRUKTUR STATIS DEWAN
// (Tidak ada perubahan di sini)
// =====================================================================

const DEWAN_STRUCTURE = {
  koinonia: {
    title: "Dewan Koinonia",
    subtitle: "Membangun Persekutuan yang Erat",
    heroImage: "https://placehold.co/1920x1080/818cf8/ffffff?text=Dewan+Koinonia",
    sections: [
      { title: "Seksi ASM", apiName: "Anak Sekolah Minggu" },
      { title: "Seksi Remaja", apiName: "Remaja" },
      { title: "Seksi Naposo", apiName: "Naposo" },
      { 
        title: "Seksi Parompuan", 
        apiName: "Parompuan",
        subgroups: [
          { title: "Koor Ina Kamis", apiName: "Koor Ina Kamis" },
          { title: "Koor Gloria", apiName: "Koor Gloria" },
          { title: "Koor Ina Hanna", apiName: "Koor Ina Hanna" },
        ]
      },
      { title: "Seksi Ama", apiName: "Ama" },
      { title: "Seksi Lansia", apiName: "Lansia" },
      { title: "Tim Doa", apiName: "Tim Doa" }, 
    ],
  },
  diakonia: {
    title: "Dewan Diakonia",
    subtitle: "Melayani Sesama dengan Kasih Kristus",
    heroImage: "https://placehold.co/1920x1080/f59e0b/ffffff?text=Dewan+Diakonia",
    sections: [
      { title: "Pendidikan", apiName: "Pendidikan" },
      { title: "Kesehatan", apiName: "Kesehatan" },
      { title: "Kemasyarakatan", apiName: "Kemasyarakatan" },
      { title: "Sosial", apiName: "Sosial" },
    ],
  },
  marturia: {
    title: "Dewan Marturia",
    subtitle: "Memberitakan Injil dan Kesaksian Iman",
    heroImage: "https://placehold.co/1920x1080/34d399/ffffff?text=Dewan+Marturia",
    sections: [
      { title: "Zending", apiName: "Zending" },
      { title: "Musik", apiName: "Musik" },
      { title: "Multimedia", apiName: "Multimedia" },
      { title: "Koor Gabungan", apiName: "Koor Gabungan" },
      { title: "Tim Teknologi Informasi", apiName: "Tim Teknologi Informasi" }, 
    ],
  },
};

// =====================================================================
// 3. KOMPONEN UTAMA (Main Component)
// (Tidak ada perubahan di sini)
// =====================================================================

export default function Dewan() {
  // State untuk UI
  const [activeTab, setActiveTab] = useState("koinonia"); 
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState(null); 

  // State untuk Data API
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. Fetch data dari API saat komponen dimuat ---
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/seksi`);
        if (!res.ok) throw new Error("Gagal memuat data pengurus seksi");
        
        const json = await res.json();
        setAllMembers(json.data || []); 
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []); 

  
  // --- 2. Logika Filter dan Strukturisasi Data ---
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    const staticSections = DEWAN_STRUCTURE[activeTab].sections;

    // Fungsi sorting (Ketua dulu)
    const roleOrder = { 'ketua': 1, 'sekretaris': 2, 'bendahara': 3 };
    const sortMembers = (a, b) => {
      const roleA = a.jabatan?.toLowerCase() || "";
      const roleB = b.jabatan?.toLowerCase() || "";
      const orderA = roleOrder[roleA] || 99;
      const orderB = roleOrder[roleB] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.nama_pengurus.localeCompare(b.nama_pengurus);
    };

    // Map melalui 'cetakan' statis dan 'suntikkan' data dari API
    return staticSections.map(sec => {
      
      const members = allMembers
        .filter(m => m.nama_seksi === sec.apiName) 
        .filter(m => !q || m.nama_pengurus.toLowerCase().includes(q)) 
        .sort(sortMembers); 

      let processedSubgroups = null;
      
      if (sec.subgroups) {
        processedSubgroups = sec.subgroups.map(sg => {
          const subMembers = allMembers
            .filter(m => m.nama_seksi === sg.apiName) 
            .filter(m => !q || m.nama_pengurus.toLowerCase().includes(q)) 
            .sort(sortMembers); 
          return { ...sg, members: subMembers };
        });

        if (q) {
          processedSubgroups = processedSubgroups.filter(sg => sg.members.length > 0);
        }
      }

      return { 
        ...sec, 
        members: members, 
        subgroups: processedSubgroups 
      };
    
    }).filter(sec => {
      if (!q) return true; 
      const hasMainMembers = sec.members.length > 0;
      const hasSubMembers = sec.subgroups?.some(sg => sg.members.length > 0) || false;
      return hasMainMembers || hasSubMembers;
    });
    
  }, [query, activeTab, allMembers]); 
  
  const noResults = !loading && query && filteredSections.length === 0;
  const currentDewanDisplay = DEWAN_STRUCTURE[activeTab]; 

  // Reset state saat ganti tab
  useEffect(() => {
    setQuery("");
    setOpenIdx(null);
  }, [activeTab]);

  return (
    <main>
      {/* Hero Dinamis */}
      <section 
        className="relative h-80 bg-cover bg-center" 
        style={{ backgroundImage: `url(${currentDewanDisplay.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">{currentDewanDisplay.title}</h1>
            <p className="mt-4 text-lg">{currentDewanDisplay.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Tabs untuk navigasi */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gray-300">
            {Object.keys(DEWAN_STRUCTURE).map(dewanKey => {
              const active = dewanKey === activeTab;
              return (
                <button
                  key={dewanKey}
                  onClick={() => setActiveTab(dewanKey)}
                  className={`tab-button font-semibold py-3 px-6 border-b-2 transition-all duration-300 capitalize ${
                    active
                      ? "text-primary border-primary"
                      : "text-gray-500 border-transparent hover:text-primary"
                  }`}
                >
                  {dewanKey}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-lg mx-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama pengurus..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Tampilan Loading / Error */}
          {loading && (
            <div className="text-center text-gray-500 p-8">Memuat data pengurus...</div>
          )}
          {error && (
            <div className="text-center text-red-500 p-8">Error: {error}</div>
          )}

          {/* Accordion List Dinamis */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredSections.map((sec, idx) => {
                const hasMain = (sec.members?.length || 0) > 0;
                const hasSub = (sec.subgroups?.some(sg => sg.members.length > 0) || false);
                const showEmptyText = !query && !hasMain && !hasSub;

                return (
                  <AccordionItem
                    key={sec.title}
                    title={sec.title}
                    open={openIdx === idx}
                    onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
                  >
                    {showEmptyText ? (
                      <div className="text-center text-gray-500">Belum ada data anggota.</div>
                    ) : (
                      <>
                        {/* Render Anggota Utama */}
                        {hasMain && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sec.members.map(m => <MemberCard key={m.nama_pengurus} member={m} />)}
                          </div>
                        )}

                        {/* Render Subgroups (jika ada) */}
                        {sec.subgroups?.map(sg => (
                          <div key={sg.title} className={`${hasMain ? 'border-t pt-6 mt-6' : ''}`}>
                            <h4 className="font-bold text-lg mb-4 text-center text-primary">{sg.title}</h4>
                            {sg.members.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sg.members.map(m => <MemberCard key={m.nama_pengurus} member={m} />)}
                              </div>
                            ) : (
                              <p className="text-center text-gray-500">Tidak ada anggota.</p>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </AccordionItem>
                );
              })}
            </div>
          )}
          
          {noResults && <p className="text-center text-gray-500 mt-12">Tidak ada anggota yang cocok dengan pencarian Anda.</p>}
        </div>
      </section>
    </main>
  );
}