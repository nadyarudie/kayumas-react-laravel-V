// src/pages/Koinonia.jsx
import React, { useMemo, useState } from "react";

const sections = [
  {
    title: "Seksi ASM",
    members: [
      {
        name: "Nama Anggota ASM Satu",
        phone: "0812-1111-2222",
        active: "01 Jan 2024 - 31 Des 2026",
        photo: "https://placehold.co/400x400/c7d2fe/1e1b4b?text=Foto",
      },
    ],
  },
  {
    title: "Seksi Remaja",
    members: [
      {
        name: "Nama Anggota Remaja",
        phone: "0812-3333-4444",
        active: "01 Jan 2024 - 31 Des 2026",
        photo: "https://placehold.co/400x400/c7d2fe/1e1b4b?text=Foto",
      },
    ],
  },
  { title: "Seksi Naposo", members: [] },
  { title: "Seksi Parompuan", members: [] },
  { title: "Seksi Ama", members: [] },
  { title: "Seksi Lansia", members: [] },
  { title: "Koor Ina Kamis", members: [] },
  { title: "Koor Gloria", members: [] },
  { title: "Koor Ina Hanna", members: [] },
];

const Koinonia = () => {
  const [openIdx, setOpenIdx] = useState(-1);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let totalMatches = 0;

    const mapped = sections
      .map((sec) => {
        const members =
          term === ""
            ? sec.members
            : sec.members.filter((m) =>
                (m.name || "").toLowerCase().includes(term)
              );
        totalMatches += members.length;
        return { ...sec, members };
      })
      .filter((sec) => term === "" || sec.members.length > 0); // sembunyikan seksi yg tak ada hasil saat mencari

    return { mapped, totalMatches, term };
  }, [q]);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/818cf8/ffffff?text=Dewan+Koinonia')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">
              Dewan Koinonia
            </h1>
            <p className="mt-4 text-lg">Membangun Persekutuan yang Erat</p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
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
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama anggota..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-4 will-animate">
            {filtered.mapped.map((sec, idx) => {
              const open = openIdx === idx;
              return (
                <div
                  key={sec.title}
                  className="accordion-item bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="accordion-header w-full flex justify-between items-center p-6 text-left"
                    onClick={() => setOpenIdx(open ? -1 : idx)}
                    aria-expanded={open}
                  >
                    <span className="text-xl font-bold text-primary">
                      {sec.title}
                    </span>
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`accordion-content transition-[max-height] duration-500 ease-in-out ${
                      open ? "max-h-[2000px]" : "max-h-0"
                    }`}
                  >
                    {sec.members.length > 0 ? (
                      <div className="bg-gray-50 p-6 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sec.members.map((m) => (
                          <div
                            key={m.name}
                            className="member-card text-center bg-white p-6 rounded-lg shadow-lg"
                          >
                            <img
                              src={m.photo}
                              alt="Foto Anggota"
                              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                            />
                            <h3 className="font-bold text-lg text-primary">
                              {m.name}
                            </h3>
                            <p className="text-sm text-gray-500">{m.phone}</p>
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-400 font-semibold">
                                MASA AKTIF
                              </p>
                              <p className="text-sm text-gray-600 font-medium">
                                {m.active}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-6 pt-4 text-center text-gray-500">
                        Belum ada data anggota.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filtered.term !== "" && filtered.totalMatches === 0 && (
              <p className="text-center text-gray-500 mt-12">
                Tidak ada anggota yang cocok dengan pencarian Anda.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Koinonia;
