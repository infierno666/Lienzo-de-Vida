function MediaLibrary() {
    const images = [
        "/assets/camas/cama-ringo-1.jpg",
        "/assets/camas/cama-nube-1.jpg",
        "/assets/muebles/sofapet-lux-1.jpg",
    ];

    return (
        <div>
            <h1 className="text-3xl font-heading text-brand mb-8">
                Biblioteca de Medios
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {images.map((img, i) => (
                    <div key={i} className="bg-white p-2 rounded-xl shadow-md">
                        <img
                            src={img}
                            alt={`media-${i}`}
                            className="w-full h-32 object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MediaLibrary;
