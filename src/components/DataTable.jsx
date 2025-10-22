function DataTable({ columns, data, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
            <table className="min-w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="px-6 py-3 font-heading text-gray-600">
                                {col}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-gray-600">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t hover:bg-gray-50 transition text-sm"
                        >
                            {columns.map((col) => (
                                <td key={col} className="px-6 py-3">
                                    {item[col.toLowerCase()]}
                                </td>
                            ))}
                            <td className="px-6 py-3 flex gap-2">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="bg-brand text-white px-3 py-1 rounded-md hover:bg-brand-dark"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
