// src/pages/ErrorPage.jsx

import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-primary font-serif">Oops!</h1>
      <p className="mt-4 text-2xl text-gray-700">Maaf, halaman tidak ditemukan.</p>
      <p className="mt-2 text-gray-500">
        <i>
          {error.statusText || error.message} (Error: {error.status || 'Unknown'})
        </i>
      </p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-3 text-white font-semibold bg-primary rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-300"
      >
        Kembali ke Halaman Utama
      </Link>
    </div>
  );
}