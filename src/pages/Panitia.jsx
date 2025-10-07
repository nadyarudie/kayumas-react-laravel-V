// src/pages/Panitia.jsx
import React, { useEffect, useMemo, useState } from "react";

function MemberCard({ m }) {
  const isKetua = m.role?.toLowerCase() === "ketua";
  return (
    <div className="member-card will-animate text-center bg-white p-6 rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative">
      <div className="relative">
        <img
          src={m.img}
          alt={m.name}
          className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-indigo-100 shadow"
          loading="lazy"
        />
        <span
          className={[
            "absolute top-24 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full border-2 border-white",
            isKetua ? "bg-indigo-500 text-white" : "bg-gray-400 text-white",
          ].join(" ")}
        >
          {m.role}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="name text-primary font-bold text-xl">{m.name}</h3>
        <p className="detail text-sm text-gray-600 mt-1">
          {m.phone} • {m.wijk}
        </p>
      </div>

      <div className="period mt-4 pt-4 border-t border-gray-200">
        <p className="period-title text-[11px] tracking-wide text-gray-400 font-semibold">
          MASA AKTIF
        </p>
        <p className="period-date text-sm text-gray-700 font-medium">
          {m.period}
        </p>
      </div>
    </div>
  );
}

export default function Panitia() {
  const [activeTab, setActiveTab] = useState("transformasi");
  const [q, setQ] = useState("");

  const tabs = [
    { id: "transformasi", label: "Transformasi 2024-2028" },
    { id: "pembangunan", label: "Pembangunan" },
    { id: "natal", label: "Panitia Natal" },
  ];

  const data = useMemo(
    () => ({
      transformasi: [
        {
          name: "Andi Wijaya",
          role: "Ketua",
          phone: "0812-3456-7890",
          wijk: "Wijk 1",
          period: "01 Jan 2024 - 31 Des 2028",
          img: "https://placehold.co/400x400/a5b4fc/1e1b4b?text=AW",
        },
        {
          name: "Sari Dewi",
          role: "Anggota",
          phone: "0812-3456-7891",
          wijk: "Wijk 2",
          period: "01 Jan 2024 - 31 Des 2028",
          img: "https://placehold.co/400x400/a5b4fc/1e1b4b?text=SD",
        },
      ],
      pembangunan: [
        {
          name: "Rahmat Hidayat",
          role: "Ketua",
          phone: "0898-7654-3210",
          wijk: "Wijk 3",
          period: "15 Feb 2023 - 14 Feb 2027",
          img: "https://placehold.co/400x400/a5b4fc/1e1b4b?text=RH",
        },
      ],
      natal: [
        {
          name: "Putri Anggraini",
          role: "Ketua",
          phone: "0811-2233-4455",
          wijk: "Wijk 4",
          period: "01 Sep 2025 - 31 Des 2025",
          img: "https://placehold.co/400x400/a5b4fc/1e1b4b?text=PA",
        },
      ],
    }),
    []
  );

  const filtered = useMemo(() => {
    const list = data[activeTab] ?? [];
    if (!q.trim()) return list;
    const s = q.toLowerCase();
    return list.filter((m) => m.name.toLowerCase().includes(s));
  }, [q, activeTab, data]);

  // Set title
  useEffect(() => {
    document.title = "Daftar Panitia - HKBP Kayu Mas";
  }, []);

  // Re-attach IntersectionObserver setiap kali tab/gird berubah
  useEffect(() => {
    const nodes = document.querySelectorAll(".will-animate");

    // Reset state (jaga-jaga)
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

    // fallback: pastikan terlihat jika observer telat
    requestAnimationFrame(() => {
      nodes.forEach((n) => n.classList.add("is-visible"));
    });

    return () => obs.disconnect();
  }, [activeTab, filtered.length]);

  // Reset pencarian saat ganti tab
  useEffect(() => {
    setQ("");
  }, [activeTab]);

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
      <section className="py-20 bg-gray-100">
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

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gray-300 will-animate">
            {tabs.map((t) => {
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

          {/* Grid anggota */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 will-animate">
            {filtered.map((m) => (
              <MemberCard key={`${activeTab}-${m.name}`} m={m} />
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada anggota yang cocok dengan pencarian Anda.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
