// src/pages/admin/Dashboard.jsx (CÓDIGO CORREGIDO)

import {
    FaBox,          // Producto Publicado
    FaRegEdit,      // Borradores
    FaEye,          // Visitas
    FaCheckCircle,  // Pedidos Completados
    FaArrowUp,
    FaArrowDown,
    FaPlusCircle,
    FaChartLine, // Se mantiene para el import
} from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

// Data
const visitsData = [
    { day: "Lun", visitas: 120 },
    { day: "Mar", visitas: 200 },
    { day: "Mié", visitas: 180 },
    { day: "Jue", visitas: 250 },
    { day: "Vie", visitas: 300 },
    { day: "Sáb", visitas: 220 },
    { day: "Dom", visitas: 150 },
];

const categoryData = [
    { categoria: "Camas", valor: 45 },
    { categoria: "Muebles", valor: 30 },
    { categoria: "Accesorios", valor: 25 },
];

// Colores de la Marca y Gráficos
const PRIMARY_COLOR = "#3b82f6";   // blue-500
const SECONDARY_COLOR = "#2563eb"; // blue-600


/* --- 🚨 COMPONENTES AUXILIARES MOVIDOS ARRIBA 🚨 --- */

// Tarjeta de Métrica (StatCard)
function StatCard({ title, value, icon, trend, trendUp, color }) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="flex justify-between items-start mb-3">
                {/* Ícono con Fondo de color para impacto */}
                <span className={`p-3 rounded-full ${color} text-white text-xl flex-shrink-0`}>
                    {icon}
                </span>

                {/* Tendencia */}
                <span
                    className={`flex items-center gap-1 text-sm font-semibold p-1.5 rounded-full ${trendUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                >
                    {trendUp ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                    <span className="ml-0.5">{trend}</span>
                </span>
            </div>
            <h3 className="text-gray-900 text-3xl font-extrabold mb-1">{value}</h3>
            <p className="text-gray-500 text-sm">{title}</p>
        </div>
    );
}

// Item de Listado (Para Últimos Productos)
function ListItem({ title, time }) {
    return (
        <li className="flex justify-between items-center border-b border-gray-50 pb-2">
            <span className="font-medium text-gray-800">{title}</span>
            <span className="text-xs text-gray-500 font-medium">{time}</span>
        </li>
    );
}


/* --- EXPORTACIÓN PRINCIPAL --- */

export default function Dashboard() {
    return (
        <div className="space-y-10">
            {/* Header y Filtros (Emoji eliminado del título principal) */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h1 className="text-3xl font-heading font-extrabold text-gray-900">
                    Resumen del Panel de Control
                </h1>
                <p className="text-gray-500 text-sm">Última actualización: Hace 5 min</p>
            </header>

            {/* 1. --- Métricas rápidas (Stat Cards) --- */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title="Productos Publicados"
                    value="24"
                    icon={<FaBox />} // Ícono Actualizado
                    trend="+8%"
                    trendUp
                    color="bg-blue-500"
                />
                <StatCard
                    title="Borradores"
                    value="3"
                    icon={<FaRegEdit />} // Ícono Actualizado
                    trend="-12%"
                    trendUp={false}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Visitas Semanales"
                    value="1.4k"
                    icon={<FaEye />} // Ícono Actualizado
                    trend="+5%"
                    trendUp
                    color="bg-green-500"
                />
                <StatCard
                    title="Pedidos Completados"
                    value="17"
                    icon={<FaCheckCircle />} // Ícono Actualizado
                    trend="+2%"
                    trendUp
                    color="bg-indigo-500"
                />
            </section>

            {/* 2. --- Gráficos y Visualización de Datos --- */}
            <section className="grid grid-cols-1 lg:grid-cols-7 gap-8">

                {/* Gráfico de Línea (Visitas) */}
                <div className="lg:col-span-4 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <h2 className="text-xl font-heading font-semibold mb-6 text-gray-800 border-b pb-3">
                        Tráfico de la Web (Últimos 7 Días)
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={visitsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis dataKey="day" stroke="#9ca3af" padding={{ left: 10, right: 10 }} />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                                labelStyle={{ fontWeight: 'bold', color: SECONDARY_COLOR }}
                            />
                            <Line
                                type="monotone"
                                dataKey="visitas"
                                stroke={PRIMARY_COLOR}
                                strokeWidth={3}
                                dot={{ r: 5, fill: SECONDARY_COLOR, strokeWidth: 2 }}
                                activeDot={{ r: 8, fill: 'white', stroke: SECONDARY_COLOR, strokeWidth: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico de Barras (Categorías) */}
                <div className="lg:col-span-3 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <h2 className="text-xl font-heading font-semibold mb-6 text-gray-800 border-b pb-3">
                        Distribución de Productos por Categoría
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={PRIMARY_COLOR} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={SECONDARY_COLOR} stopOpacity={0.5} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                            <XAxis dataKey="categoria" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip />
                            <Bar
                                dataKey="valor"
                                fill="url(#colorBar)"
                                barSize={30}
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* 3. --- Listados y Tablas de Datos --- */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Top Productos (Emoji eliminado) */}
                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <h2 className="text-xl font-heading font-semibold mb-4 text-gray-800">
                        Top 5 Productos Más Vistos
                    </h2>
                    <ul className="divide-y divide-gray-100">
                        {[
                            ["Cama Ortopédica Premium", "120"],
                            ["SofáPet Lux", "98"],
                            ["Estación de Descanso", "82"],
                            ["Cama Nube", "77"],
                            ["Casa Moderna", "54"],
                        ].map(([nombre, vistas], index) => (
                            <li
                                key={nombre}
                                className="flex justify-between py-3 items-center text-gray-700 hover:bg-blue-50/50 rounded-lg px-2 transition"
                            >
                                <span className="flex items-center gap-3 font-medium">
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {index + 1}
                                    </span>
                                    {nombre}
                                </span>
                                <span className="font-extrabold text-blue-600">{vistas}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Últimos Productos Añadidos (Emoji eliminado) */}
                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                    <h2 className="text-xl font-heading font-semibold mb-4 text-gray-800">
                        Últimos Productos Añadidos
                    </h2>
                    <ul className="space-y-4 text-gray-700">
                        <ListItem title="Cama Nórdica Minimal" time="hace 2 días" />
                        <ListItem title="SofáPeludito Deluxe" time="hace 5 días" />
                        <ListItem title="Casa EcoBamboo" time="hace 1 semana" />
                        <ListItem title="Alfombra Térmica Pet" time="hace 1 semana" />
                        <ListItem title="Comedero Inteligente V3" time="hace 2 semanas" />
                    </ul>
                </div>
            </section>

            {/* 4. --- Enlaces rápidos (Call to Action) --- */}
            <section className="bg-white border-2 border-dashed border-blue-200/50 rounded-xl p-6 flex flex-col md:flex-row gap-6 justify-between items-center shadow-lg">
                <div className="flex items-center gap-4 text-gray-800">
                    <FaPlusCircle className="text-4xl text-blue-600 flex-shrink-0" />
                    <div>
                        <h2 className="text-xl font-heading font-bold mb-1">
                            ¡Manos a la Obra!
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Gestiona rápidamente tus productos o actualiza el contenido de tu sitio.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <a
                        href="/admin/productos/nuevo"
                        className="bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-md whitespace-nowrap text-center"
                    >
                        + Crear Nuevo Producto
                    </a>
                    <a
                        href="/admin/paginas"
                        className="bg-gray-100 text-gray-700 px-5 py-3 rounded-lg text-sm font-semibold hover:bg-gray-200 transition border border-gray-200 whitespace-nowrap text-center"
                    >
                        Página de Inicio CMS
                    </a>
                </div>
            </section>
        </div>
    );
}