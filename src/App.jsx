import React from "react";
// No necesitamos importar 'Outlet' aquí, solo en los Layouts/Guards que lo usan.
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

        {/* 1. Ruta pública de Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* 🚨 2. ÁREA ADMIN (PROTEGIDA) - CORRECCIÓN CLAVE 🚨 */}
        {/* Usamos AuthGuard para proteger todas las rutas anidadas. */}
        <Route path="/admin" element={<AuthGuard />}>

          {/* Dentro del AuthGuard, definimos el AdminLayout. 
              Todas las rutas anidadas (children) se renderizarán dentro de su <Outlet />. */}
          <Route element={<AdminLayout />}>
            {/* Ruta Index: /admin */}
            <Route index element={<Dashboard />} />

            {/* Rutas anidadas de administración */}
            <Route path="productos" element={<ProductsList />} />
            <Route path="productos/nuevo" element={<ProductFormPage />} />
            <Route path="productos/editar/:id" element={<ProductFormPage />} />
            <Route path="medios" element={<MediaLibrary />} />

            {/* Cualquier otra ruta que no haga match dentro de /admin */}
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Route>

        {/* ======================================================= */}
        {/* --- 3. ÁREA PÚBLICA (Correcta) --- */}
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
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Esta última ruta de NotFound ya no es estrictamente necesaria si la anidada captura todos los casos */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;