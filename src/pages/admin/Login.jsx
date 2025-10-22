import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación simple de login
    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-2xl w-full max-w-sm"
      >
        <h1 className="text-3xl font-heading text-brand mb-6 text-center">
          Iniciar Sesión
        </h1>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-6"
          required
        />
        <button
          type="submit"
          className="w-full bg-brand text-white py-3 rounded-lg hover:bg-brand-dark transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
