import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Pengajuan = () => {
  useEffect(() => {
    // Animasi muncul
    const els = document.querySelectorAll('.will-animate');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
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
            "url('https://placehold.co/1920x1080/a5b4fc/ffffff?text=Layanan+Jemaat')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white will-animate opacity-0 translate-y-10 transition duration-700">
            <h1 className="text-5xl md:text-7xl font-bold font-serif">Layanan Pengajuan</h1>
            <p className="mt-4 text-lg">Mempermudah Kebutuhan Administratif dan Reservasi Anda</p>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-20 bg-gray-100">
        <div className="mx-auto w-full max-w-screen-xl px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pengajuan Administratif */}
            <div className="will-animate opacity-0 translate-y-10 transition duration-700 bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2">
              <Link to="/pengajuan/administratif" className="block">
                <div className="p-8 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-indigo-100 text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Pengajuan Administratif</h3>
                  <p className="text-gray-600 mb-6">
                    Urus surat keterangan, pendaftaran anggota, dan kebutuhan administrasi gerejawi lainnya.
                  </p>
                  <span className="font-semibold text-primary group-hover:text-indigo-600 transition-colors duration-300">
                    Ajukan Sekarang →
                  </span>
                </div>
              </Link>
            </div>

            {/* Reservasi Fasilitas */}
            <div
              className="will-animate opacity-0 translate-y-10 transition duration-700 bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2"
              style={{ transitionDelay: '150ms' }}
            >
                <Link to="/pengajuan/reservasi" className="block">                <div className="p-8 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 text-amber-800 mx-auto mb-6 group-hover:bg-amber-800 group-hover:text-white transition-colors duration-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-800 mb-3">Reservasi Fasilitas</h3>
                  <p className="text-gray-600 mb-6">
                    Reservasi gedung serbaguna atau ruangan lainnya untuk keperluan acara Anda.
                  </p>
                  <span className="font-semibold text-amber-800 group-hover:text-amber-600 transition-colors duration-300">
                    Reservasi Sekarang →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pengajuan;
