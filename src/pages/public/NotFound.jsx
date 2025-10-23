import React from 'react';
import './NotFound.css'; // Importa el CSS con animaciones

const NotFound = () => {
    return (
        // CAMBIO: Añadimos 'w-screen h-screen' para que ocupe todo el viewport
        // Eliminamos 'w-[1248px] h-[620px]' y 'mx-auto my-8'
        <div className="block404 w-screen h-screen relative overflow-hidden cursor-pointer">

            {/* Las ondas */}
            <div className="waves"></div>

            {/* El objeto animado */}
            <div className="obj">
                <img
                    src="https://imgur.com/w0Yb4MX.png"
                    alt="Objeto flotando"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* El texto '404' */}
            <div className="t404"></div>

            {/* El SVG con la definición del filtro "glitch" */}
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0">
                <defs>
                    <filter id="glitch">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="1" result="warp" id="turb" />
                        <feColorMatrix in="warp" result="huedturb" type="hueRotate" values="90">
                            <animate
                                attributeType="XML"
                                attributeName="values"
                                values="0;180;360"
                                dur="3s"
                                repeatCount="indefinite"
                            />
                        </feColorMatrix>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="50" in="SourceGraphic" in2="huedturb" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default NotFound;