import React, { useMemo, useState } from "react";

const MemberCard = ({ name, role, phone, wijk, photo, period }) => (
  <div className="member-card relative bg-white p-6 rounded-lg shadow-lg text-center">
    {role && (
      <span className="role-tag absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
        {role}
      </span>
    )}
    <img
      src={photo}
      alt={name}
      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
    />
    <h3 className="name font-bold text-lg text-primary">{name}</h3>
    {(phone || wijk) && (
      <p className="detail text-sm text-gray-500">
        {phone}{phone && wijk ? " • " : ""}{wijk}
      </p>
    )}
    {period && (
      <div className="period mt-3 pt-3 border-t border-gray-200">
        <p className="period-title text-xs text-gray-400 font-semibold">MASA AKTIF</p>
        <p className="period-date text-sm text-gray-600 font-medium">{period}</p>
      </div>
    )}
  </div>
);

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
    <div className="accordion-content" style={{ maxHeight: open ? "10000px" : 0, transition: "max-height .5s ease-in-out" }}>
      <div className="bg-gray-50 p-6 pt-4">{children}</div>
    </div>
  </div>
);

export default function DewanKoinonia() {
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState(null);

  // data sesuai HTML kamu
  const sections = useMemo(() => ([
    {
      title: "Seksi ASM",
      members: [
        { name: "Budi Santoso", role: "Ketua", phone: "0812-1111-2222", wijk: "Wijk 1", photo: "https://placehold.co/400x400/c7d2fe/1e1b4b?text=BS", period: "01 Jan 2024 - 31 Des 2026" },
        { name: "Citra Lestari", role: "Anggota", phone: "0812-1111-3333", wijk: "Wijk 2", photo: "https://placehold.co/400x400/c7d2fe/1e1b4b?text=CL", period: "01 Jan 2024 - 31 Des 2026" },
      ],
    },
    {
      title: "Seksi Remaja",
      members: [
        { name: "Doni Saputra", role: "Ketua", phone: "0812-2222-1111", wijk: "Wijk 3", photo: "https://placehold.co/400x400/a5b4fc/1e1b4b?text=DS", period: "01 Jan 2024 - 31 Des 2026" },
      ],
    },
    { title: "Seksi Naposo", members: [] },
    {
      title: "Seksi Parompuan",
      members: [
        { name: "Erika Manurung", role: "Ketua", phone: "0812-5555-6666", wijk: "Wijk 4", photo: "https://placehold.co/400x400/fecaca/7f1d1d?text=EM", period: "01 Jan 2024 - 31 Des 2026" },
      ],
      subgroups: [
        {
          title: "Koor Ina Kamis",
          members: [
            { name: "Fani Silalahi", role: "Ketua", phone: "0812-7777-8888", wijk: "Wijk 5", photo: "https://placehold.co/400x400/fecaca/7f1d1d?text=FS", period: "01 Jan 2024 - 31 Des 2026" },
            { name: "Grace Hutapea", role: "Anggota", phone: "0812-9999-0000", wijk: "Wijk 6", photo: "https://placehold.co/400x400/fecaca/7f1d1d?text=GH", period: "01 Jan 2024 - 31 Des 2026" },
          ],
        },
        { title: "Koor Gloria", members: [] },
        { title: "Koor Ina Hanna", members: [] },
      ],
    },
    { title: "Seksi Ama", members: [] },
    { title: "Seksi Lansia", members: [] },
  ]), []);

  // filter by query
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;

    return sections.map(sec => {
      const match = (m) => m.name.toLowerCase().includes(q);
      const members = sec.members?.filter(match) || [];
      const subgroups = sec.subgroups?.map(sg => ({ ...sg, members: sg.members.filter(match) }))?.filter(sg => sg.members.length > 0);
      const hasAny = (members.length > 0) || (subgroups && subgroups.length > 0);
      return hasAny ? { ...sec, members, subgroups } : { ...sec, members: [], subgroups: [] };
    }).filter(sec => (sec.members?.length || 0) + (sec.subgroups?.reduce((a,b)=>a+b.members.length,0) || 0) > 0);
  }, [query, sections]);

  const noResults = query && filteredSections.length === 0;

  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/818cf8/ffffff?text=Dewan+Koinonia')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Dewan Koinonia</h1>
            <p className="mt-4 text-lg">Membangun Persekutuan yang Erat</p>
          </div>
        </div>
      </section>

      {/* Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-lg mx-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="Cari nama anggota..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {(query ? filteredSections : sections).map((sec, idx) => {
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
                      {hasMain && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {sec.members.map(m => (
                            <MemberCard key={m.name} {...m} />
                          ))}
                        </div>
                      )}
                      {sec.subgroups?.map(sg => (
                        <div key={sg.title} className="border-t pt-6 mt-6">
                          <h4 className="font-bold text-lg mb-4 text-center text-primary">{sg.title}</h4>
                          {sg.members.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {sg.members.map(m => <MemberCard key={m.name} {...m} />)}
                            </div>
                          ) : (
                            <p className="text-center text-gray-500">Belum ada data anggota.</p>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </AccordionItem>
              );
            })}
          </div>

          {noResults && <p className="text-center text-gray-500 mt-12">Tidak ada anggota yang cocok dengan pencarian Anda.</p>}
        </div>
      </section>
    </main>
  );
}
