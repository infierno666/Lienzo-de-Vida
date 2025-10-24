import { useState, useEffect, useCallback } from "react";
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ImageZoomHandler from "./ImageZoomHandler";

const isEmbedUrl = (url) =>
    url && (url.includes("youtube.com") || url.includes("vimeo.com") || url.includes("youtu.be"));

export default function ImageGallery({ images = [], altPrefix = "", video }) {
    const [index, setIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allItems = video
        ? [{ type: "video", src: video }, ...images.map((src) => ({ type: "image", src }))]
        : images.map((src) => ({ type: "image", src }));

    const currentItem = allItems[index];

    const handleNext = useCallback(() => setIndex((prev) => (prev + 1) % allItems.length), [allItems.length]);
    const handlePrev = useCallback(() => setIndex((prev) => (prev - 1 + allItems.length) % allItems.length), [allItems.length]);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    // 🎹 Soporte de teclado dentro del modal
    useEffect(() => {
        if (!isModalOpen) return;
        const handleKey = (e) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isModalOpen, handleNext, handlePrev, closeModal]);

    // 🎥 Render principal
    const renderMainContent = () => {
        if (currentItem.type === "video") {
            const videoUrl = currentItem.src;
            return isEmbedUrl(videoUrl) ? (
                <div className="w-full aspect-video bg-black overflow-hidden rounded-xl shadow-lg">
                    <iframe
                        src={videoUrl}
                        title={`${altPrefix} Video`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            ) : (
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
                    <video controls className="w-full h-full object-contain">
                        <source src={videoUrl} type="video/mp4" />
                        Tu navegador no soporta video.
                    </video>
                </div>
            );
        }

        // 🖼️ Imagen principal
        return (
            <button
                onClick={() => setIsModalOpen(true)}
                className="relative w-full aspect-[5/4] overflow-hidden rounded-xl group"
                aria-label="Ampliar imagen"
            >
                <img
                    src={currentItem.src}
                    alt={`${altPrefix} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-base font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Clic para Zoom
                </div>
            </button>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Imagen / Video principal */}
            <div className="shadow-lg rounded-xl overflow-hidden">{renderMainContent()}</div>

            {/* Miniaturas */}
            {allItems.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {allItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${i === index ? "border-brand-dark ring-2 ring-brand-dark/50" : "border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {item.type === "video" ? (
                                <div className="w-full h-full bg-black flex items-center justify-center">
                                    <FaPlay className="text-white w-5 h-5" />
                                </div>
                            ) : (
                                <img src={item.src} alt={`${altPrefix} thumb ${i + 1}`} className="w-full h-full object-cover" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* 🔍 Modal con zoom */}
            {isModalOpen && currentItem?.type === "image" && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={closeModal}
                >
                    <div className="relative w-full h-full max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
                        <ImageZoomHandler src={currentItem.src} altPrefix={altPrefix} index={index} zoomAmount={2.5} />

                        {/* Controles de navegación */}
                        {allItems.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Botón cerrar */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white text-3xl p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                        <FaTimes />
                    </button>

                    {/* Instrucción */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                        Mueve el ratón para explorar o usa las flechas ← →
                    </div>
                </div>
            )}
        </div>
    );
}
