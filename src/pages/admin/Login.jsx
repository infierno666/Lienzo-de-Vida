// src/pages/admin/Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Lock, Mail, LogIn, Globe, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 🚨 IMPORTAR la función real del backend
import { loginAdmin } from '../../api/authService.js'; // Ajusta la ruta si es necesario

const TARGET_ROUTE = '/admin'; 

export default function Login() {
  const navigate = useNavigate ? useNavigate() : null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
    // Opcional: Revisar si el usuario ya está logueado y redirigir
    // if (localStorage.getItem('admin_token')) {
    //   navigate(TARGET_ROUTE, { replace: true });
    // }
  }, [navigate]); // Añadir 'navigate' a las dependencias

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --- Validación de Cliente ---
    if (!email || !password) {
      setError('Por favor ingresa correo y contraseña.');
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Ingresa un correo válido.');
      return;
    }

    setLoading(true);

    try {
      // 🚨 1. LLAMADA REAL AL BACKEND (Node.js/Supabase)
      await loginAdmin(email, password);

      // 2. ÉXITO: Redirección
      if (navigate) navigate(TARGET_ROUTE, { replace: true });
      else window.location.href = TARGET_ROUTE;

    } catch (err) {
      // 3. FALLO: Capturar y mostrar el error del servidor (ej: 401 Credenciales inválidas)
      console.error("Login API Error:", err.message);
      setError(err.message || "Error de servidor. No se pudo iniciar sesión.");

    } finally {
      // 4. Detener el estado de carga
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-10 px-4">

      <div className="w-full max-w-6xl bg-transparent grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT - Imagen */}
        {/* ... (Tu componente de imagen se mantiene igual) ... */}
        <aside className="hidden lg:flex lg:col-span-7 rounded-xl overflow-hidden relative shadow-2xl">
          <img
            src="/src/assets/hero.webp"
            alt="Beagle en cama - Lienzo de Vida"
            className="absolute inset-0 w-full h-full object-cover brightness-95"
            aria-hidden
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/1e293b/ffffff?text=Imagen+Placeholder' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,23,42,0.22)] to-[rgba(15,23,42,0.12)]"></div>
        </aside>

        {/* RIGHT - Form card */}
        <main className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-xl p-8 md:p-10 shadow-lg flex flex-col justify-center">

          <div className="max-w-md w-full mx-auto">
            {/* Encabezado atractivo */}
            <div className="text-center space-y-3">
              <img
                src="/src/assets/logo.png"
                alt="Logo Lienzo de Vida"
                className="w-30 h-20 mx-auto mb-2 drop-shadow-md"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/1e293b/ffffff?text=LOGO' }}
              />
              <h1 className="text-4xl font-heading font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 bg-clip-text text-transparent">
                Acceso Administrador
              </h1>
              <p className="text-gray-500 text-sm">
                Ingresa tus credenciales de administrador
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="text-xs font-medium text-slate-700">Correo</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail className="w-4 h-4" /></span>
                  <input
                    id="email"
                    ref={emailRef}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Coreeo Electrónico"
                    className="w-full pl-11 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                    aria-invalid={error ? true : false}
                    aria-describedby={error ? 'form-error' : undefined}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label htmlFor="password" className="text-xs font-medium text-slate-700">Contraseña</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock className="w-4 h-4" /></span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* extra row */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 select-none">
                  <input type="checkbox" className="h-4 w-4 rounded text-indigo-600" />
                  <span className="text-slate-700">Recordarme</span>
                </label>

                <Link to="/admin/recuperar-contraseña" className="text-indigo-600 hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>

              {/* server error */}
              {error && (
                <div id="form-error" className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded p-3">
                  <AlertCircle className="mt-0.5 w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Error de autenticación</div>
                    <div className="text-xs">{error}</div>
                  </div>
                </div>
              )}

              {/* submit - atractivo */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full py-3 rounded-xl text-white font-semibold shadow-2xl transition-all duration-300 transform 
                    ${loading
                      ? 'opacity-75 cursor-wait pointer-events-none'
                      : 'hover:scale-[1.01] active:scale-[0.98] hover:shadow-lg focus:ring-green-500'}
                    bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 
                    hover:from-emerald-700 hover:via-green-700 hover:to-lime-600 
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                >
                  <span className="flex items-center justify-center gap-3">
                    {loading ? (
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="4" stroke="rgba(255,255,255,0.35)" fill="none" /></svg>
                    ) : (
                      <LogIn className="w-5 h-5" />
                    )}
                    <span className="text-sm">{loading ? 'Ingresando...' : 'Acceder'}</span>
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
              <Globe className="inline mr-1 w-4 h-4" />
              <Link to="/" className="hover:underline">Volver al sitio público</Link>
            </div>
          </div>

        </main>

      </div>

      {/* Inline CSS animations & prefers-reduced-motion */}
      <style>{`
  @keyframes floatUp { 0% { transform: translateY(0); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0); } }
  @media (prefers-reduced-motion: no-preference) {
    img[alt*="Beagle"] { animation: floatUp 6s ease-in-out infinite; }
  }

  /* pequeño ajuste para el botón (suaviza hover) */
  .scale-102 { transform: scale(1.02); }
`}</style>

    </div>
  );
}