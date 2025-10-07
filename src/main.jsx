// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import PetaWilayah from './pages/PetaWilayah.jsx';
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
import NotFound from './pages/NotFound.jsx';
import Panitia from './pages/Panitia.jsx';
import Pengajuan from './pages/Pengajuan.jsx';
import Reservasi from './pages/pengajuan/Reservasi.jsx';


// === Dewan pages (pakai yang baru) ===
import DewanKoinonia from './pages/dewan/Koinonia.jsx';
import DewanMarturia from './pages/dewan/Marturia.jsx';
import DewanDiakonia from './pages/dewan/Diakonia.jsx';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: 'sejarah', element: <Sejarah /> },
        { path: 'visimisi', element: <VisiMisi /> },
        { path: 'anak-lahir', element: <AnakLahir /> },
        { path: 'jemaat-sakit', element: <JemaatSakit /> },
        { path: 'jemaat-meninggal', element: <JemaatMeninggal /> },
        { path: 'peta-wilayah', element: <PetaWilayah /> },
        { path: 'artikel', element: <ArticleList /> },
        { path: 'artikel/:slug', element: <ArticleDetail /> },
        { path: 'galeri-foto', element: <GaleriFoto /> },
        { path: 'galeri-video', element: <GaleriVideo /> },
        { path: 'panitia', element: <Panitia /> },
        { path: 'pengajuan', element: <Pengajuan /> },
        { path: 'pengajuan/reservasi', element: <Reservasi /> },

        // === Dewan ===
        { path: 'dewan/koinonia', element: <DewanKoinonia /> },
        { path: 'dewan/marturia', element: <DewanMarturia /> },
        { path: 'dewan/diakonia', element: <DewanDiakonia /> },

        // 404 dalam layout
        { path: '404', element: <NotFound /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
