import { useState, useRef, useEffect } from "react";

export default function ImageZoomHandler({ src, altPrefix, index, zoomAmount = 2.5 }) {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es móvil
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // 🖱️ Manejar movimiento del ratón (panning cuando está zoomed)
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (scale === 1) {
            // Mover origen del zoom
            setOrigin({ x: `${x}%`, y: `${y}%` });
        }

        if (isDragging) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setOffset((prev) => ({
                x: prev.x + dx,
                y: prev.y + dy,
            }));
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    // 📌 Iniciar arrastre
    const handleMouseDown = (e) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            e.preventDefault();
        }
    };

    // 📌 Detener arrastre
    const handleMouseUp = () => setIsDragging(false);

    // 🔍 Doble clic o toque → alternar zoom
    const toggleZoom = () => {
        if (scale === 1) {
            setScale(zoomAmount);
        } else {
            setScale(1);
            setOffset({ x: 0, y: 0 });
        }
    };

    // 🔄 Scroll para controlar zoom
    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setScale((prev) => Math.min(prev + 0.3, zoomAmount));
        } else {
            setScale((prev) => Math.max(prev - 0.3, 1));
        }
    };

    // 📱 Doble toque para zoom (móviles)
    const lastTap = useRef(0);
    const handleTouch = () => {
        const now = Date.now();
        if (now - lastTap.current < 300) {
            toggleZoom();
        }
        lastTap.current = now;
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden bg-black rounded-xl touch-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onClick={isMobile ? handleTouch : undefined}
            onDoubleClick={isMobile ? undefined : toggleZoom}
        >
            <img
                src={src}
                alt={`${altPrefix} ${index}`}
                className="w-full h-full object-cover select-none transition-transform duration-300 ease-in-out"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: `${origin.x} ${origin.y}`,
                    cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                }}
                draggable={false}
            />

            {/* Overlay informativo */}
            {scale === 1 && (
                <div className="absolute inset-0 flex items-center justify-center text-white/80 text-base bg-black/10 opacity-0 md:hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {isMobile ? "Doble toque para hacer zoom" : "Doble clic o rueda para acercar"}
                </div>
            )}
        </div>
    );
}
