// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout & pages
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Wijk from './pages/Wijk.jsx';
import ArticleList from './pages/ArticleList.jsx';
import ArticleDetail from './pages/ArticleDetail.jsx';
import Sejarah from './pages/Sejarah.jsx';
import VisiMisi from './pages/VisiMisi.jsx';
import AnakLahir from './pages/AnakLahir.jsx';
import JemaatSakit from './pages/JemaatSakit.jsx';
import JemaatMeninggal from './pages/JemaatMeninggal.jsx';
import GaleriFoto from './pages/GaleriFoto.jsx';
import GaleriVideo from './pages/GaleriVideo.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import NotFound from './pages/NotFound.jsx'; // <-- BARUc
import Panitia from './pages/Panitia.jsx'; // <-- BARUc
import Koinonia from './pages/Koinonia.jsx'; // ⬅️ baru



// CSS utama
import './index.css';

// Router dengan basename agar path absolut ("/artikel") otomatis jadi "/<BASE_URL>/artikel"
// BASE_URL akan mengikuti setting Vite "base" saat build (mis. '/kayumas/')
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      // Tetap punya errorElement untuk error fatal
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: 'sejarah', element: <Sejarah /> },
        { path: 'visimisi', element: <VisiMisi /> },
        { path: 'anak-lahir', element: <AnakLahir /> },
        { path: 'jemaat-sakit', element: <JemaatSakit /> },
        { path: 'jemaat-meninggal', element: <JemaatMeninggal /> },
        { path: 'wijk', element: <Wijk /> },
        { path: 'artikel', element: <ArticleList /> },
        { path: 'artikel/:slug', element: <ArticleDetail /> },
        { path: 'galeri-foto', element: <GaleriFoto /> },
        { path: 'galeri-video', element: <GaleriVideo /> },
        { path: 'panitia', element: <Panitia /> },
        { path: "dewan/koinonia", element: <Koinonia /> },

        // 404 "dalam layout" supaya Navbar & Footer tetap tampil
        { path: '404', element: <NotFound /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    // KUNCI: pakai BASE_URL dari Vite agar semua path absolut bekerja di subfolder
    basename: import.meta.env.BASE_URL,
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
