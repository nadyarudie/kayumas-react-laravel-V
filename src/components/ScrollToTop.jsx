// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jika ada #hash, scroll ke elemen tersebut
    if (hash) {
      const target =
        document.querySelector(hash) ||
        document.getElementById(decodeURIComponent(hash.replace('#', '')));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Kalau tidak ada hash, scroll ke paling atas
    // Ganti 'smooth' -> 'auto' bila mau langsung tanpa animasi
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}
