import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Administratif() {
  useEffect(() => {
    const els = document.querySelectorAll(".will-animate");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1920x1080/a5b4fc/ffffff?text=Administrasi')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate opacity-0 translate-y-10 transition">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Administrasi Gerejawi</h1>
            <p className="mt-4 text-lg">Layanan untuk Kebutuhan Sakramen dan Keanggotaan Jemaat</p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-gray-100">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Baptis */}
            <div className="will-animate bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition">
              <Link to="/pengajuan/administratif/baptis" className="block">
                <div className="p-8 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-cyan-100 text-cyan-800 mx-auto mb-6 group-hover:bg-cyan-800 group-hover:text-white transition">
                    <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0A2.25 2.25 0 0018.75 9.75h-1.5a3 3 0 10-6 0h-1.5A2.25 2.25 0 003 12m18 0h-1.5a3 3 0 10-6 0h-1.5a3 3 0 10-6 0H3m9 6V9"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-800 mb-3">Pendaftaran Baptis</h3>
                  <p className="text-gray-600 mb-6">Daftarkan anak Anda untuk menerima Sakramen Baptisan Kudus.</p>
                  <span className="font-semibold text-cyan-800 group-hover:text-cyan-600 transition">
                    Daftar Sekarang &rarr;
                  </span>
                </div>
              </Link>
            </div>

            {/* Jemaat Baru */}
            <div className="will-animate bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition"
                 style={{ transitionDelay: "150ms" }}>
              <Link to="/pengajuan/administratif/jemaat-baru" className="block">
                <div className="p-8 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-800 mx-auto mb-6 group-hover:bg-green-800 group-hover:text-white transition">
                    <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">Pendaftaran Jemaat Baru</h3>
                  <p className="text-gray-600 mb-6">Bergabunglah sebagai anggota jemaat HKBP Kayumas.</p>
                  <span className="font-semibold text-green-800 group-hover:text-green-600 transition">
                    Daftar Sekarang &rarr;
                  </span>
                </div>
              </Link>
            </div>

            {/* Menikah */}
            <div className="will-animate bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition"
                 style={{ transitionDelay: "300ms" }}>
              <Link to="/pengajuan/administratif/menikah" className="block">
                <div className="p-8 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-rose-100 text-rose-800 mx-auto mb-6 group-hover:bg-rose-800 group-hover:text-white transition">
                    <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-rose-800 mb-3">Pemberkatan Nikah</h3>
                  <p className="text-gray-600 mb-6">Daftarkan dan jadwalkan pemberkatan pernikahan kudus Anda.</p>
                  <span className="font-semibold text-rose-800 group-hover:text-rose-600 transition">
                    Daftar Sekarang &rarr;
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
