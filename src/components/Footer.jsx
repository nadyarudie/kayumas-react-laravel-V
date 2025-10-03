// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Alamat */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-accent pb-2 tracking-wider">
              HKBP RESORT KAYU MAS
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              Jl. Kayu Mas Raya, Pulo Gadung, Kec. Pulo Gadung, Kota Jakarta Timur, DKI Jakarta 13260
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-accent pb-2 tracking-wider">
              NAVIGASI
            </h3>
            <ul className="grid gap-y-3 text-sm">
              <li><Link to="/" className="text-blue-200 hover:text-white">Home</Link></li>
              <li><Link to="/sejarah" className="text-blue-200 hover:text-white">Profil</Link></li>
              <li><Link to="/wijk" className="text-blue-200 hover:text-white">Info Wijk</Link></li>
              <li><Link to="/artikel" className="text-blue-200 hover:text-white">Publikasi</Link></li>
            </ul>
          </div>

          {/* Info Wijk (dirapikan: pakai gap grid, tanpa space-y) */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-accent pb-2 tracking-wider">
              INFO WIJK
            </h3>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm justify-items-start">
              {Array.from({ length: 8 }, (_, i) => i + 1).map((wijk) => (
                <li key={wijk}>
                  <Link to="/wijk" className="text-blue-200 hover:text-white">
                    Wijk {wijk}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rekening */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-accent pb-2 tracking-wider">
              REKENING BANK
            </h3>
            <ul className="grid gap-y-3 text-blue-200 text-sm">
              <li>Bank Mandiri: 125-00-7720-0772</li>
              <li>Bank BRI: 0230-01-002935-56-1</li>
            </ul>
            <img src="/images/qris.jpg" alt="QRIS Code" className="mt-4 w-32 rounded-lg" />
          </div>
        </div>

        <div className="mt-12 border-t border-blue-800 pt-8 text-center text-blue-300 text-sm">
          <p>© {currentYear} HKBP Kayu Mas. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
