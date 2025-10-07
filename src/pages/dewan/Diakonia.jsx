import React, { useMemo, useState } from "react";

const MemberCard = (props) => (
  <div className="member-card relative bg-white p-6 rounded-lg shadow-lg text-center">
    {props.role && <span className="role-tag absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">{props.role}</span>}
    <img src={props.photo} alt={props.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
    <h3 className="font-bold text-lg text-primary">{props.name}</h3>
    {(props.phone || props.wijk) && (
      <p className="text-sm text-gray-500">{props.phone}{props.phone && props.wijk ? " • " : ""}{props.wijk}</p>
    )}
    {props.period && (
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-400 font-semibold">MASA AKTIF</p>
        <p className="text-sm text-gray-600 font-medium">{props.period}</p>
      </div>
    )}
  </div>
);

const AccordionItem = ({ title, open, onToggle, children }) => (
  <div className="accordion-item bg-white rounded-lg shadow-md overflow-hidden">
    <button className="w-full flex justify-between items-center p-6 text-left" onClick={onToggle}>
      <span className="text-xl font-bold text-primary">{title}</span>
      <svg className={`w-6 h-6 transform transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div className="accordion-content" style={{ maxHeight: open ? "10000px" : 0, transition: "max-height .5s ease-in-out" }}>
      <div className="bg-gray-50 p-6 pt-4">{children}</div>
    </div>
  </div>
);

export default function DewanDiakonia() {
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState(null);

  const sections = useMemo(() => ([
    {
      title: "Sosial",
      members: [
        { name: "Chandra Wijaya", role: "Ketua", phone: "0815-1234-5678", wijk: "Wijk 1", photo: "https://placehold.co/400x400/fcd34d/b45309?text=CW", period: "01 Mar 2024 - 28 Feb 2027" },
      ],
    },
    { title: "Pendidikan", members: [] },
    { title: "Kesehatan", members: [] },
    { title: "Kemasyarakatan", members: [] },
  ]), []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return sections;
    const match = (m) => m.name.toLowerCase().includes(q);
    return sections
      .map(s => ({ ...s, members: s.members.filter(match) }))
      .filter(s => s.members.length > 0);
  }, [query, sections]);

  const list = query ? filtered : sections;
  const noResults = query && list.length === 0;

  return (
    <main>
      <section className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/f59e0b/ffffff?text=Dewan+Diakonia')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Dewan Diakonia</h1>
            <p className="mt-4 text-lg">Melayani Sesama dengan Kasih Kristus</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
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

          <div className="space-y-4">
            {list.map((sec, idx) => (
              <AccordionItem
                key={sec.title}
                title={sec.title}
                open={openIdx === idx}
                onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                {sec.members.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sec.members.map(m => <MemberCard key={m.name} {...m} />)}
                  </div>
                ) : (
                  <div className="text-center text-gray-500">Belum ada data anggota.</div>
                )}
              </AccordionItem>
            ))}
          </div>

          {noResults && <p className="text-center text-gray-500 mt-12">Tidak ada anggota yang cocok dengan pencarian Anda.</p>}
        </div>
      </section>
    </main>
  );
}
