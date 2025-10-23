// src/components/ImageGallery.jsx
import { useState } from "react";

/**
 * ImageGallery
 * Props:
 *  - images: array of image URLs
 *  - altPrefix: string
 *  - video (optional): URL to video (mp4 or embed)
 */
export default function ImageGallery({ images = [], altPrefix = "", video }) {
    const [index, setIndex] = useState(0);

    return (
        <div>
            <div className="w-full bg-gray-100 rounded-xl overflow-hidden shadow-soft">
                {/* Main image or video */}
                <div className="relative overflow-hidden">
                    {video ? (
                        <div className="w-full aspect-[4/3] bg-black rounded-xl overflow-hidden flex items-center justify-center">
                            {/* video player responsive */}
                            <video controls className="w-full h-full object-cover">
                                <source src={video} type="video/mp4" />
                                Tu navegador no soporta video.
                            </video>
                        </div>
                    ) : (
                        <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden rounded-xl">
                            <img
                                src={images[index]}
                                alt={`${altPrefix} ${index + 1}`}
                                className="w-full h-full object-cover transform transition duration-500 ease-out hover:scale-110"
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto items-center">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border ${i === index ? "border-brand" : "border-transparent"
                                }`}
                            aria-label={`Ver imagen ${i + 1}`}
                        >
                            <img src={src} alt={`${altPrefix} thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
