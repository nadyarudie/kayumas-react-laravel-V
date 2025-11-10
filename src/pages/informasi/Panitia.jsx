import React, { useEffect, useMemo, useState } from "react";

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

function MemberCard({ m }) {
  // (Komponen MemberCard tetap sama seperti sebelumnya)
  const role = m.jabatan_panitia || "Anggota";
  const isKetua = role.toLowerCase() === "ketua";

  const initials = m.nama_panitia
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="member-card will-animate card-border-wrap text-center bg-white p-6 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative">
      <div className="relative">
        <div className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-indigo-100 shadow bg-indigo-200 text-indigo-800 flex items-center justify-center text-3xl font-bold">
          {initials || "-"}
        </div>
        
        <span
          className={[
            "absolute top-24 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full border-2 border-white shadow-md",
            isKetua ? "bg-indigo-500 text-white" : "bg-gray-400 text-white",
          ].join(" ")}
        >
          {role}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="name text-primary font-bold text-xl">{m.nama_panitia}</h3>
        <p className="detail text-sm text-gray-600 mt-1">
          Wijk {m.wilayah_wijk}
        </p>
      </div>

      <div className="period mt-4 pt-4 border-t border-gray-200">
        <p className="period-title text-[11px] tracking-wide text-gray-400 font-semibold">
          TANGGAL KEGIATAN
        </p>
        <p className="period-date text-sm text-gray-700 font-medium">
          {formatDate(m.tgl_kegiatan)}
        </p>
      </div>
    </div>
  );
}

export default function Panitia() {
  const [allPanitia, setAllPanitia] = useState([]);
  const [dynamicTabs, setDynamicTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [q, setQ] = useState("");

  // (useEffect untuk fetch data tetap sama)
  useEffect(() => {
    const fetchPanitia = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/panitia`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        
        const json = await res.json();
        const panitiaData = json.data || [];
        setAllPanitia(panitiaData);

        const uniqueKegiatan = [...new Set(panitiaData.map(p => p.nama_kegiatan))];
        
        const tabs = uniqueKegiatan.map(kegiatan => ({
          id: kegiatan.toLowerCase().replace(/\s+/g, '-'),
          label: kegiatan
        }));
        
        setDynamicTabs(tabs);
        
        if (tabs.length > 0) {
          setActiveTab(tabs[0].id);
        }
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data panitia.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPanitia();
  }, []);

  // --- ✨ PERUBAHAN UTAMA DI SINI (useMemo filtered) ✨ ---
  const filtered = useMemo(() => {
    if (loading || !activeTab) return [];
    
    const currentKegiatanLabel = dynamicTabs.find(t => t.id === activeTab)?.label;
    if (!currentKegiatanLabel) return [];

    // 1. Filter berdasarkan Tab
    let list = allPanitia.filter(p => p.nama_kegiatan === currentKegiatanLabel);

    // 2. Filter berdasarkan Pencarian (jika ada)
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((m) => m.nama_panitia.toLowerCase().includes(s));
    }

    // 3. ✨ Lakukan Sorting pada list hasil filter ✨
    // Buat 'kamus' prioritas jabatan
    const roleOrder = {
      'ketua': 1,
      'sekretaris': 2,
      'bendahara': 3,
      // Jabatan lain akan otomatis mendapat prioritas 99
    };

    list.sort((a, b) => {
      const roleA = a.jabatan_panitia?.toLowerCase() || "";
      const roleB = b.jabatan_panitia?.toLowerCase() || "";

      // Ambil urutan prioritas, jika tidak ada di 'roleOrder', beri nilai 99
      const orderA = roleOrder[roleA] || 99;
      const orderB = roleOrder[roleB] || 99;

      // Jika prioritasnya berbeda, urutkan berdasarkan prioritas (1, 2, 3...)
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // Jika prioritasnya sama (misal sama-sama 'anggota' atau 99),
      // urutkan berdasarkan abjad nama
      return a.nama_panitia.localeCompare(b.nama_panitia);
    });

    return list;

  }, [q, activeTab, allPanitia, dynamicTabs, loading]); // Dependensi tetap sama

  // (useEffect untuk Set Title tetap sama)
  useEffect(() => {
    document.title = "Daftar Panitia - HKBP Kayu Mas";
  }, []);

  // (useEffect untuk IntersectionObserver tetap sama)
  useEffect(() => {
    const nodes = document.querySelectorAll(".will-animate");
    nodes.forEach((n) => n.classList.remove("is-visible"));

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    nodes.forEach((n) => obs.observe(n));
    requestAnimationFrame(() => {
      nodes.forEach((n) => n.classList.add("is-visible"));
    });
    return () => obs.disconnect();
  }, [activeTab, filtered.length]);

  // (useEffect untuk Reset Search tetap sama)
  useEffect(() => {
    setQ("");
  }, [activeTab]);

  // (Return JSX tetap sama seperti sebelumnya)
  return (
    <>
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
            <h1 className="text-5xl md:text-7xl font-bold font-serif">
              Kepanitiaan
            </h1>
            <p className="mt-4 text-lg">
              Melayani Bersama dalam Satu Tubuh Kristus
            </p>
          </div>
        </div>
      </section>

      {/* Konten */}
      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="mx-auto w-full max-w-screen-xl px-6">
          
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
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama anggota..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Tampilan Loading / Error */}
          {loading && (
            <div className="text-center p-12 text-gray-500">
              Memuat data kepanitiaan...
            </div>
          )}
          {error && (
             <div className="text-center p-12 text-red-500">
              {error}
            </div>
          )}

          {/* Tabs (Dinamis) */}
          {!loading && !error && (
             <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gray-300 will-animate">
              {dynamicTabs.map((t) => {
                const active = t.id === activeTab;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={[
                      "tab-button font-semibold py-3 px-6 border-b-2 transition-all duration-300",
                      active
                        ? "text-primary border-primary"
                        : "text-gray-500 border-transparent hover:text-primary",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          )}
          
          {/* Grid anggota */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 will-animate">
              {filtered.map((m) => (
                <MemberCard key={`${activeTab}-${m.nama_panitia}`} m={m} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  Tidak ada anggota yang cocok dengan pencarian Anda di panitia ini.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}