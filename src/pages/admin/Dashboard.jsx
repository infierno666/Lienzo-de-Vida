function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-heading text-brand mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 shadow-md rounded-xl text-center">
                    <h2 className="text-gray-600 mb-2">Productos Totales</h2>
                    <p className="text-2xl font-bold text-brand">4</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-xl text-center">
                    <h2 className="text-gray-600 mb-2">Ventas Simuladas</h2>
                    <p className="text-2xl font-bold text-brand">26</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-xl text-center">
                    <h2 className="text-gray-600 mb-2">Usuarios</h2>
                    <p className="text-2xl font-bold text-brand">3</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
