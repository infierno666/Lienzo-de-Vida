import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; // Importamos 'Outlet' si no lo estás usando
import ScrollToTop from "./components/ScrollToTop"; // 💡 Nuevo componente para el scroll

import AppLayout from "./layouts/AppLayout";

// Public pages
import Home from "./pages/public/Home";
import Catalog from "./pages/public/Catalog";
import Product from "./pages/public/Product"; // Ficha de producto
import Nosotros from "./pages/public/Nosotros";
import Contacto from "./pages/public/Contacto";
import EnviosCobertura from "./pages/public/EnviosCobertura";
import NotFound from "./pages/public/NotFound";

// Legal pages
// NOTA: Revisa que la carpeta 'LEGAL' tenga el mismo case en tu disco duro para evitar errores en producción
import PoliticaPrivacidad from "./pages/public/LEGAL/PoliticaPrivacidad";
import TerminosServicio from "./pages/public/LEGAL/TerminosServicio";
import FAQ from "./pages/public/LEGAL/FAQ";
import Devoluciones from "./pages/public/LEGAL/Devoluciones";

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import AuthGuard from "./components/AuthGuard"; // El componente que verifica la sesión y rol
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/ProductsList";
import ProductFormPage from "./pages/admin/ProductFormPage";
import MediaLibrary from "./pages/admin/MediaLibrary";

function App() {
  return (
    <BrowserRouter>
      {/* 1. COMPONENTE SCROLL AL TOPE: Se ejecuta en cada cambio de ruta */}
      <ScrollToTop />

      <Routes>

        {/* ======================================================= */}
        {/* --- 2. ÁREA ADMIN (PROTEGIDA) --- */}
        {/* Usamos AuthGuard para proteger todas las subrutas del admin */}
        {/* ======================================================= */}

        {/* Ruta pública de Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Ruta protectora: Si AuthGuard aprueba, permite la renderización de las rutas anidadas.
          El AuthGuard debería retornar <Outlet /> si el usuario es admin, o <Navigate to="/admin/login" /> si no lo es.
        */}
        <Route element={<AuthGuard />}>
          {/* AdminLayout es el contenedor de todas las páginas internas del admin */}
          <Route path="/admin" element={<AdminLayout />}>

            {/* Rutas anidadas del Admin: Todas protegidas y con el AdminLayout */}
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<ProductsList />} />
            <Route path="productos/nuevo" element={<ProductFormPage />} />
            <Route path="productos/editar/:id" element={<ProductFormPage />} />
            <Route path="medios" element={<MediaLibrary />} />

            {/* Si un usuario admin accede a /admin/ruta-no-existente, le mostramos el 404 del Admin si lo tuvieras,
                sino, lo enviamos al Dashboard */}
            <Route path="*" element={<Dashboard />} />

          </Route>
        </Route>

        {/* ======================================================= */}
        {/* --- 3. ÁREA PÚBLICA --- */}
        {/* ======================================================= */}

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="producto/:slug" element={<Product />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="envios-y-cobertura" element={<EnviosCobertura />} />
          <Route path="contacto" element={<Contacto />} />

          {/* --- LEGAL & AYUDA --- */}
          <Route path="politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="terminos-de-servicio" element={<TerminosServicio />} />
          <Route path="preguntas-frecuentes" element={<FAQ />} />
          <Route path="devoluciones" element={<Devoluciones />} />

          {/* --- 404 para rutas públicas (va al final) --- */}
          {/* Si ninguna de las rutas anteriores hizo match, usamos la última: */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 4. Captura final de rutas que NO USAN AppLayout (e.g. rutas mal escritas que no son /admin/*) */}
        {/* Esto es solo por si acaso */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;