import React from 'react';


export default function Modal({ isOpen, onClose, movie }) {
    if (!isOpen || !movie) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div
                className="
                    relative
                    bg-zinc-950
                    text-white
                    rounded-2xl
                    shadow-2xl
                    w-full
                    max-w-3xl
                    max-h-[92vh]
                    flex flex-col
                    overflow-hidden
                    border border-white/5
                "
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/*HEADER*/}
                <div className="relative h-64 md:h-80 flex-shrink-0">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md">
                            {movie.title || movie.name}
                        </h2>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* INFORMACION PRINCIPAL */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4 text-sm font-bold">
                                <span className="text-zinc-400">
                                    {new Date(movie.release_date || movie.first_air_date).getFullYear()}
                                </span>
                                <span className="border border-zinc-700 px-2 py-0.5 rounded text-[10px] text-zinc-400 uppercase tracking-widest">
                                    4k
                                </span>
                            </div>
                            <p className="text-zinc-300 leading-relaxed text-lg">
                                {movie.overview || "Sin descripción disponible."}
                            </p>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}