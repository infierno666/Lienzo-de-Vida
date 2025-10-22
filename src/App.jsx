import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/public/Home";
import Nosotros from "./pages/public/Nosotros";
import Contacto from "./pages/public/Contacto";
import EnviosCobertura from "./pages/public/EnviosCobertura";
import Catalog from "./pages/public/Catalog";
import AdminLayout from "./layouts/AdminLayout";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/ProductsList";
import ProductFormPage from "./pages/admin/ProductFormPage";
import MediaLibrary from "./pages/admin/MediaLibrary";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AdminLayout />
            </AuthGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<ProductsList />} />
          <Route path="productos/nuevo" element={<ProductFormPage />} />
          <Route path="productos/editar/:id" element={<ProductFormPage />} />
          <Route path="medios" element={<MediaLibrary />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/envios-y-cobertura" element={<EnviosCobertura />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
