// src/components/Header.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({
  query,
  onQueryChange,
  matchIndex = 0,
  matchTotal = 0,
  onSearchNext,
  onSearchPrev,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleMobileDropdown = (menu) => {
    setOpenMobileDropdown(openMobileDropdown === menu ? '' : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenMobileDropdown('');
  };

  const handleSearchChange = (e) => onQueryChange(e.target.value);

  const closeSearch = () => {
    setIsSearchActive(false);
    onQueryChange('');
  };

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-40">
      <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 flex-shrink-0"
            onClick={closeMobileMenu}
          >
            <img src="/images/logo.png" alt="HKBP Kayu Mas Logo" className="h-12" />
            <span className="text-2xl font-bold font-serif hidden sm:block">
              HKBP Kayu Mas
            </span>
          </Link>

          {/* Desktop Nav */}
          {!isSearchActive ? (
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold tracking-wider ml-auto">
              {/* 1. HOME */}
              <Link to="/" className="nav-link">HOME</Link>

              {/* 2. PROFIL */}
              <div className="relative group">
                <button type="button" className="nav-link flex items-center">
                  PROFIL
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                  <li>
                    <Link to="/sejarah" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 rounded-t-md shadow-xl">Sejarah</Link>
                  </li>
                  <li>
                    <Link to="/visimisi" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 shadow-xl">Visi & Misi</Link>
                  </li>
                  <li>
                    <Link to="/parhalado" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 shadow-xl">Parhalado</Link>
                  </li>
                </ul>
              </div>

              {/* 3. INFORMASI (Panitia paling atas) */}
              <div className="relative group">
                <button type="button" className="nav-link flex items-center">
                  INFORMASI
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                  <li>
                    <Link to="/panitia" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 rounded-t-md shadow-xl">Panitia</Link>
                  </li>
                  <li>
                    <Link to="/anak-lahir" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 shadow-xl">Anak Lahir</Link>
                  </li>
                  <li>
                    <Link to="/jemaat-sakit" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 shadow-xl">Jemaat Sakit</Link>
                  </li>
                  <li>
                    <Link to="/jemaat-meninggal" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 rounded-b-md shadow-xl">Jemaat Meninggal</Link>
                  </li>
                </ul>
              </div>

              {/* 4. DEWAN */}

              <Link to="/dewan" className="nav-link">DEWAN</Link>
              {/* <div className="relative group">
                <button type="button" className="nav-link flex items-center">
                  DEWAN
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                  <li><Link to="/koinonia" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 rounded-t-md shadow-xl">Koinonia</Link></li>
                  <li><Link to="/marturia" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 shadow-xl">Marturia</Link></li>
                  <li><Link to="/diakonia" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 rounded-b-md shadow-xl">Diakonia</Link></li>
                </ul>
              </div> */}

              {/* 5. PUBLIKASI */}
              <div className="relative group">
                <button type="button" className="nav-link flex items-center">
                  PUBLIKASI
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
                  <li><Link to="/artikel" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 rounded-t-md shadow-xl">Semua Artikel</Link></li>
                  <li><Link to="/galeri" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 shadow-xl">Galeri Foto</Link></li>
                  <li><Link to="/galeri-video" className="block w-56 bg-primary hover:bg-blue-900 px-4 py-2 rounded-b-md shadow-xl">Galeri Video</Link></li>
                </ul>
              </div>

              {/* 6. PETA WILAYAH */}
              <Link to="/peta-wilayah" className="nav-link">PETA WILAYAH</Link>

              {/* 7. PENGAJUAN */}
              <Link to="/pengajuan" className="nav-link">PENGAJUAN</Link>

              {/* Search toggle */}
              <button
                onClick={() => setIsSearchActive(true)}
                className="ml-4 p-2 rounded-full hover:bg-blue-900"
                aria-label="Cari di halaman"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </nav>
          ) : (
            // Desktop Search Bar
            <div className="hidden lg:flex items-center w-full max-w-xl ml-auto gap-2">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Cari teks di halaman ini..."
                  className="w-full py-2 pl-12 pr-28 text-gray-800 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                  autoFocus
                />
                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                  <span className="text-xs text-gray-700 bg-white/70 rounded px-2 py-0.5">
                    {matchIndex}/{matchTotal}
                  </span>
                  <button onClick={onSearchPrev} className="p-1 rounded hover:bg-white/40" title="Sebelumnya">↑</button>
                  <button onClick={onSearchNext} className="p-1 rounded hover:bg-white/40" title="Berikutnya">↓</button>
                </div>
              </div>
              <button onClick={closeSearch} className="ml-1 p-2 text-2xl text-white hover:text-accent" aria-label="Tutup pencarian">
                &times;
              </button>
            </div>
          )}

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle pencarian"
            >
              {isSearchActive ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none p-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchActive && (
          <div className="lg:hidden pb-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                value={query}
                onChange={handleSearchChange}
                placeholder="Cari teks..."
                className="w-full py-2 pl-12 pr-28 text-gray-800 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                <span className="text-xs text-gray-700 bg-white/70 rounded px-2 py-0.5">
                  {matchIndex}/{matchTotal}
                </span>
                <button onClick={onSearchPrev} className="p-1 rounded hover:bg-white/40" title="Sebelumnya">↑</button>
                <button onClick={onSearchNext} className="p-1 rounded hover:bg-white/40" title="Berikutnya">↓</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {!isSearchActive && (
        <div
          id="mobile-menu"
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-primary border-t border-blue-900`}
        >
          <div className="px-4 sm:px-6 py-4 space-y-3 text-sm">

            {/* 1. HOME */}
            <Link to="/" className="block py-2" onClick={closeMobileMenu}>HOME</Link>

            {/* 2. PROFIL */}
            <button
              className="w-full text-left flex justify-between items-center py-2"
              onClick={() => toggleMobileDropdown('profil')}
              aria-expanded={openMobileDropdown === 'profil'}
            >
              <span>PROFIL</span>
              <svg className={`h-4 w-4 transform transition ${openMobileDropdown === 'profil' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMobileDropdown === 'profil' && (
              <div className="pl-4 space-y-2">
                <Link to="/sejarah" className="block py-1" onClick={closeMobileMenu}>Sejarah</Link>
                <Link to="/visimisi" className="block py-1" onClick={closeMobileMenu}>Visi & Misi</Link>
                <Link to="/parhalado" className="block py-1" onClick={closeMobileMenu}>Parhalado</Link>
              </div>
            )}

            {/* 3. INFORMASI */}
            <button
              className="w-full text-left flex justify-between items-center py-2"
              onClick={() => toggleMobileDropdown('informasi')}
              aria-expanded={openMobileDropdown === 'informasi'}
            >
              <span>INFORMASI</span>
              <svg className={`h-4 w-4 transform transition ${openMobileDropdown === 'informasi' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMobileDropdown === 'informasi' && (
              <div className="pl-4 space-y-2">
                <Link to="/panitia" className="block py-1" onClick={closeMobileMenu}>Panitia</Link>
                <Link to="/anak-lahir" className="block py-1" onClick={closeMobileMenu}>Anak Lahir</Link>
                <Link to="/jemaat-sakit" className="block py-1" onClick={closeMobileMenu}>Jemaat Sakit</Link>
                <Link to="/jemaat-meninggal" className="block py-1" onClick={closeMobileMenu}>Jemaat Meninggal</Link>
              </div>
            )}

            {/* 4. DEWAN */}
            <button
              className="w-full text-left flex justify-between items-center py-2"
              onClick={() => toggleMobileDropdown('dewan')}
              aria-expanded={openMobileDropdown === 'dewan'}
            >
              <span>DEWAN</span>
              <svg className={`h-4 w-4 transform transition ${openMobileDropdown === 'dewan' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMobileDropdown === 'dewan' && (
              <div className="pl-4 space-y-2">
                <Link to="/dewan/koinonia" className="block py-1" onClick={closeMobileMenu}>Koinonia</Link>
                <Link to="/dewan/marturia" className="block py-1" onClick={closeMobileMenu}>Marturia</Link>
                <Link to="/dewan/diakonia" className="block py-1" onClick={closeMobileMenu}>Diakonia</Link>
              </div>
            )}

            {/* 5. PUBLIKASI */}
            <button
              className="w-full text-left flex justify-between items-center py-2"
              onClick={() => toggleMobileDropdown('publikasi')}
              aria-expanded={openMobileDropdown === 'publikasi'}
            >
              <span>PUBLIKASI</span>
              <svg className={`h-4 w-4 transform transition ${openMobileDropdown === 'publikasi' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMobileDropdown === 'publikasi' && (
              <div className="pl-4 space-y-2">
                <Link to="/artikel" className="block py-1" onClick={closeMobileMenu}>Semua Artikel</Link>
                <Link to="/galeri" className="block py-1" onClick={closeMobileMenu}>Galeri Foto</Link>
                <Link to="/galeri-video" className="block py-1" onClick={closeMobileMenu}>Galeri Video</Link>
              </div>
            )}

            {/* 6. PETA WILAYAH */}
            <Link to="/peta-wilayah" className="block py-2" onClick={closeMobileMenu}>PETA WILAYAH</Link>

            {/* 7. PENGAJUAN */}
            <Link to="/pengajuan" className="block py-2" onClick={closeMobileMenu}>PENGAJUAN</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;