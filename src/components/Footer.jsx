import React from 'react';
import { Link } from 'react-router-dom';

// SVG Icons for Social Media with hover effect wrapper
const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transform hover:scale-110 transition-transform duration-200">
    {children}
  </a>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c-4.01.084-5.83 1.83-5.83 5.83v8.34c0 4.01 1.82 5.745 5.83 5.83h8.34c4.01-.085 5.83-1.82 5.83-5.83V7.83c0-4.01-1.82-5.745-5.83-5.83H12.315zm-1.002 2.18h8.34c3.08.07 4.14 1.12 4.14 4.14v8.34c0 3.09-1.06 4.07-4.14 4.14h-8.34c-3.08-.07-4.14-1.05-4.14-4.14V8.32c0-3.02 1.06-4.07 4.14-4.14zm4.195 2.29a.972.972 0 100 1.944.972.972 0 000-1.944zm-3.193 1.545c-2.43 0-4.398 1.97-4.398 4.398s1.968 4.398 4.398 4.398 4.398-1.97 4.398-4.398-1.968-4.398-4.398-4.398zm0 2.18c1.226 0 2.218 1.002 2.218 2.218s-1.002 2.218-2.218 2.218-2.218-1.002-2.218-2.218 1.002-2.218 2.218-2.218z" clipRule="evenodd" /></svg>
);
const TiktokIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-2.11.02-3.78.01-7.56.02-11.33zM9.49 11.22c-1.33-.02-2.65.16-3.89.65-.98.38-1.84 1.06-2.48 1.9-.81 1.07-1.19 2.37-1.12 3.73.04.76.19 1.51.46 2.23.69 1.8 2.32 3.14 4.17 3.66.9.25 1.83.33 2.75.31.85-.08 1.69-.34 2.45-.77.83-.49 1.52-1.16 2.05-1.98.54-.85.83-1.81.85-2.83.01-1.43-.02-2.86-.01-4.29-2.29-.14-4.56-.78-6.38-2.19z"/></svg>
);
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);
const YoutubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.897 3.434 0 4.926 0 8.75v6.5C0 19.073.897 20.566 4.385 20.816c3.6.245 11.626.246 15.23 0C23.103 20.566 24 19.073 24 15.25v-6.5c0-3.823-.897-5.316-4.385-5.316zM9.75 15.3v-6.6l5.25 3.3-5.25 3.3z" clipRule="evenodd" /></svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Branding and Social */}
          <div className="py-8 md:py-0 lg:col-span-1">
             <h3 className="text-xl font-bold font-serif mb-4 tracking-wider relative pb-3">
              HKBP KAYU MAS
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-accent"></span>
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Melayani dengan kasih, bertumbuh dalam iman, dan menjadi berkat bagi dunia.
            </p>
            <div className="flex space-x-5">
              <SocialIcon href="https://www.instagram.com"><InstagramIcon /></SocialIcon>
              <SocialIcon href="https://www.tiktok.com"><TiktokIcon /></SocialIcon>
              <SocialIcon href="https://www.facebook.com"><FacebookIcon /></SocialIcon>
              <SocialIcon href="https://www.youtube.com"><YoutubeIcon /></SocialIcon>
            </div>
          </div>

          {/* Column 2: Navigasi */}
          <div className="py-8 md:py-0">
            <h3 className="text-lg font-semibold mb-4 tracking-wider relative pb-3">
              Tautan Cepat
               <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <ul className="grid gap-y-3 text-sm">
              <li><Link to="/" className="text-blue-200 hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/sejarah" className="text-blue-200 hover:text-white transition-colors duration-200">Sejarah</Link></li>
              <li><Link to="/visimisi" className="text-blue-200 hover:text-white transition-colors duration-200">Visi & Misi</Link></li>
              <li><Link to="/panitia" className="text-blue-200 hover:text-white transition-colors duration-200">Panitia</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Pelayanan */}
          <div className="py-8 md:py-0">
            <h3 className="text-lg font-semibold mb-4 tracking-wider relative pb-3">
              Pelayanan
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <ul className="grid gap-y-3 text-sm">
              <li><Link to="/koinonia" className="text-blue-200 hover:text-white transition-colors duration-200">Dewan Koinonia</Link></li>
              <li><Link to="/wijk" className="text-blue-200 hover:text-white transition-colors duration-200">Info Wijk</Link></li>
              <li><Link to="/artikel" className="text-blue-200 hover:text-white transition-colors duration-200">Publikasi</Link></li>
            </ul>
          </div>

          {/* Column 4: Kontak & Rekening */}
          <div className="py-8 md:py-0">
            <h3 className="text-lg font-semibold mb-4 tracking-wider relative pb-3">
              Kontak & Persembahan
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent"></span>
            </h3>
             <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Jl. Kayu Mas Raya, Pulo Gadung, Jakarta Timur, 13260
            </p>
            <ul className="grid gap-y-2 text-blue-200 text-sm mb-4">
              <li className="font-semibold">Bank Mandiri: 125-00-7720-0772</li>
              <li className="font-semibold">Bank BRI: 0230-01-002935-56-1</li>
            </ul>
            <img src="/images/qris.jpg" alt="QRIS Code" className="w-28 rounded-lg bg-gray-200" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/112x112/e0e7ff/374151?text=QRIS'; }} />
          </div>
        </div>
      </div>
      <div className="bg-blue-900/50">
        <div className="container mx-auto px-6 py-6 text-center text-blue-300 text-sm">
          <p>© {currentYear} HKBP Kayu Mas Resort Kayu Mas. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

