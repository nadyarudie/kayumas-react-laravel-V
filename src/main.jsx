// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import PetaWilayah from "./pages/PetaWilayah.jsx";

// Profil
import Sejarah from "./pages/profil/Sejarah.jsx";
import VisiMisi from "./pages/profil/VisiMisi.jsx";
import Parhalado from './pages/profil/Parhalado.jsx';

// Dewan
import Diakonia from "./pages/dewan/Diakonia.jsx";
import Koinonia from "./pages/dewan/Koinonia.jsx";
import Marturia from "./pages/dewan/Marturia.jsx";

// Informasi
import AnakLahir from "./pages/informasi/AnakLahir.jsx";
import JemaatSakit from "./pages/informasi/JemaatSakit.jsx";
import JemaatMeninggal from "./pages/informasi/JemaatMeninggal.jsx";
import Panitia from "./pages/informasi/Panitia.jsx";

// Publikasi
import ArticleList from "./pages/publikasi/ArticleList.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import GaleriFoto from "./pages/publikasi/GaleriFoto.jsx";
import GaleriVideo from "./pages/publikasi/GaleriVideo.jsx";


// Pengajuan
import Pengajuan from "./pages/pengajuan/Pengajuan.jsx";
import Reservasi from "./pages/pengajuan/Reservasi.jsx";
import Administratif from "./pages/pengajuan/administratif/Administratif.jsx";
import Baptis from "./pages/pengajuan/administratif/Baptis.jsx";
import JemaatBaru from "./pages/pengajuan/administratif/JemaatBaru.jsx";
import Menikah from "./pages/pengajuan/administratif/Menikah.jsx";

import ErrorPage from "./pages/ErrorPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },

        // Profil
        { path: "sejarah", element: <Sejarah /> },
        { path: "visimisi", element: <VisiMisi /> },
        { path: 'parhalado', element: <Parhalado /> },

        // Dewan
        { path: "diakonia", element: <Diakonia /> },
        { path: "koinonia", element: <Koinonia /> },
        { path: "marturia", element: <Marturia /> },

        // Informasi
        { path: "anak-lahir", element: <AnakLahir /> },
        { path: "jemaat-sakit", element: <JemaatSakit /> },
        { path: "jemaat-meninggal", element: <JemaatMeninggal /> },
        { path: "panitia", element: <Panitia /> },

        // Publikasi
        { path: "artikel", element: <ArticleList /> },
        { path: "artikel/:slug", element: <ArticleDetail /> },
        { path: "galeri-foto", element: <GaleriFoto /> },
        { path: "galeri-video", element: <GaleriVideo /> },

        // Peta wilayah
        { path: "peta-wilayah", element: <PetaWilayah /> },

        // Pengajuan
        { path: "pengajuan", element: <Pengajuan /> },
        { path: "pengajuan/reservasi", element: <Reservasi /> },

        // Pengajuan > Administratif
        { path: "pengajuan/administratif", element: <Administratif /> },
        { path: "pengajuan/administratif/baptis", element: <Baptis /> },
        { path: "pengajuan/administratif/jemaat-baru", element: <JemaatBaru /> },
        { path: "pengajuan/administratif/menikah", element: <Menikah /> },

        // 404 dalam layout
        { path: "404", element: <NotFound /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
