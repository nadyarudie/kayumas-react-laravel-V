import React, { useEffect } from "react";

export default function Parhalado() {
  useEffect(() => {
    // Animasi muncul saat scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0 }
    );

    document.querySelectorAll(".will-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Pencarian
    const input = document.getElementById("search-input");
    const cards = document.querySelectorAll(".member-card");
    const noResults = document.getElementById("no-results");

    const handleSearch = () => {
      const term = input.value.toLowerCase();
      let found = false;
      cards.forEach((card) => {
        const name = card.dataset.name.toLowerCase();
        const visible = name.includes(term);
        card.style.display = visible ? "block" : "none";
        if (visible) found = true;
      });
      noResults.style.display = found ? "none" : "block";
    };

    input?.addEventListener("input", handleSearch);
    return () => input?.removeEventListener("input", handleSearch);
  }, []);

  const data = [
    { name: "Resort ABC", wijk: "Wijk Induk", periode: "01 Jan 2022 - 31 Des 2026", delay: 0 },
    { name: "John Doe", wijk: "Wijk 1", periode: "01 Jan 2023 - 31 Des 2027", delay: 100 },
    { name: "Jane Smith", wijk: "Wijk 2", periode: "01 Jan 2023 - 31 Des 2027", delay: 200 },
    { name: "Michael Johnson", wijk: "Wijk Induk", periode: "15 Mar 2024 - 14 Mar 2028", delay: 300 },
  ];

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

          {/* Grid */}
          <div
            id="parhalado-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {data.map((item, i) => (
              <div
                key={i}
                data-name={item.name}
                style={{ transitionDelay: `${item.delay}ms` }}
                className="will-animate bg-white rounded-xl shadow-lg p-6 text-center transform transition hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-32 h-32 rounded-full bg-indigo-300 text-indigo-900 font-bold text-4xl shadow-md border-4 border-indigo-100">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                <p className="text-gray-500">{item.wijk}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-400 font-semibold tracking-wide">MASA AKTIF</p>
                  <p className="text-sm text-gray-700 font-medium">{item.periode}</p>
                </div>
              </div>
            ))}
          </div>

          <p id="no-results" className="text-center text-gray-500 mt-12 hidden">
            Tidak ada parhalado yang cocok dengan pencarian Anda.
          </p>
        </div>
      </section>
    </main>
  );
}