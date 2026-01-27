import React, { useEffect, useState } from 'react';
import { supabase } from '../constants/supabaseClient.js';
import { ApiMovie } from '../services/api-movie.js';
import {QRCodeCanvas} from "qrcode.react"; // Usamos tu servicio actualizado

export default function Modal({ isOpen, onClose, movie }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loadingFav, setLoadingFav] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);

    // 1. Efecto para cargar datos al abrir el modal
    useEffect(() => {
        if (isOpen && movie?.id) {
            setTrailerKey(null);
            checkIfFavorite();
            fetchTrailer();
        }
    }, [isOpen, movie]);

    // 2. Lógica para obtener el tráiler usando tu clase ApiMovie
    const fetchTrailer = async () => {
        try {
            // Intentamos primero en español
            let results = await ApiMovie.getMovieVideos(movie.id, 'es-MX');

            // Si no hay resultados, intentamos en inglés automáticamente
            if (!results || results.length === 0) {
                results = await ApiMovie.getMovieVideos(movie.id, 'en-US');
            }

            // Buscamos un "Trailer" oficial, o en su defecto un "Teaser" o "Clip"
            const video = results.find(v => v.site === "YouTube" && v.type === "Trailer")
                || results.find(v => v.site === "YouTube" && (v.type === "Teaser" || v.type === "Clip"));

            if (video) {
                setTrailerKey(video.key);
            }
        } catch (error) {
            console.error("Error al obtener el tráiler:", error);
        }
    };

    // 3. Verificar si está en favoritos en Supabase
    const checkIfFavorite = async () => {
        const { data } = await supabase
            .from('favorites')
            .select('*')
            .eq('movie_id', movie.id)
            .maybeSingle();
        setIsFavorite(!!data);
    };

    // 4. Agregar o eliminar de favoritos
    const toggleFavorite = async () => {
        setLoadingFav(true);
        if (isFavorite) {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('movie_id', movie.id);
            if (!error) setIsFavorite(false);
        } else {
            // Capturamos el dispositivo del usuario
            const deviceDetail = navigator.userAgentData
                ? `${navigator.userAgentData.platform} - ${navigator.userAgentData.brands[0].brand}`
                : navigator.platform;

            const { error } = await supabase
                .from('favorites')
                .insert([{
                    movie_id: movie.id,
                    title: movie.title || movie.name,
                    poster_path: movie.poster_path,
                    device: deviceDetail
                    // created_at se genera automáticamente en Supabase
                }]);
            if (!error) setIsFavorite(true);
        }
        setLoadingFav(false);
    };

    if (!isOpen || !movie) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 text-white">
            {/* Overlay para cerrar */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Contenedor Principal del Modal */}
            <div className="relative bg-zinc-950 rounded-[2.5rem] shadow-2xl w-full max-w-6xl border border-white/10 flex flex-col md:flex-row max-h-[90vh] overflow-hidden">

                {/* BOTÓN CERRAR */}
                <button onClick={onClose} className="absolute top-5 right-5 z-[80] p-2 bg-black/60 hover:bg-white hover:text-black rounded-full transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* --- COLUMNA IZQUIERDA: PÓSTER Y QR --- */}
                <div className="w-full md:w-[320px] bg-zinc-900 flex flex-col flex-shrink-0 border-r border-white/5">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto object-cover"
                    />

                    {/* Espacio para el Código QR */}
                    <div className="p-10 flex-1 flex flex-col items-center justify-center gap-4 bg-zinc-900">
                        <div className="bg-white p-3 rounded-2xl shadow-xl transition-transform hover:scale-110 duration-300">
                            {/* GENERADOR DE QR DINÁMICO */}
                            <QRCodeCanvas
                                value={`https://tu-app-movie.vercel.app/movie/${movie.id}`} // Aquí va la URL de tu app
                                size={120}
                                level={"H"} // Alta recuperación de errores
                                includeMargin={false}
                                imageSettings={{
                                    src: "/logo-mini.png", // Puedes poner un mini logo en el centro
                                    x: undefined,
                                    y: undefined,
                                    height: 24,
                                    width: 24,
                                    excavate: true,
                                }}
                            />
                        </div>
                        <p className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase text-center">
                            Escanea para ver en <br/> <span className="text-red-600">Tu Celular</span>
                        </p>
                    </div>
                </div>

                {/* --- COLUMNA DERECHA: TRÁILER E INFO --- */}
                <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">

                    {/* Sección del Video */}
                    <div className="relative w-full aspect-video bg-black group">
                        {trailerKey ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                                {movie.backdrop_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
                                        alt=""
                                    />
                                )}
                                <div className="relative z-10 flex flex-col items-center gap-2">
                                    <svg className="w-12 h-12 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    <span className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">Tráiler no disponible</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sección de Texto */}
                    <div className="p-8 md:p-12 space-y-8">
                        <div className="flex justify-between items-start gap-8">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                                {movie.title || movie.name}
                            </h2>

                            <button
                                onClick={toggleFavorite}
                                disabled={loadingFav}
                                className={`p-5 rounded-[1.5rem] border transition-all duration-500 ${
                                    isFavorite
                                        ? 'bg-red-600 border-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.4)] scale-110'
                                        : 'bg-zinc-900 border-white/10 text-white hover:bg-white hover:text-black'
                                } ${loadingFav ? 'opacity-50 cursor-wait' : ''}`}
                            >
                                <svg className="w-7 h-7" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-6 text-zinc-400 font-black text-sm tracking-widest uppercase">
                            <span className="bg-white/10 px-4 py-1.5 rounded-xl text-white border border-white/5">
                                {movie.release_date ? new Date(movie.release_date).getFullYear() : '2026'}
                            </span>
                            <span className="flex items-center gap-2 text-yellow-500">
                                <span className="text-lg">★</span> {movie.vote_average?.toFixed(1) || '0.0'}
                            </span>
                            <span className="border border-zinc-800 px-3 py-1 rounded text-[10px]">ULTRA HD</span>
                        </div>

                        <p className="text-zinc-400 leading-relaxed text-xl font-medium max-w-3xl">
                            {movie.overview || "Esta obra maestra no tiene una descripción disponible todavía."}
                        </p>

                        <div className="pt-4">
                            <button className="bg-white text-black font-black px-10 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm shadow-xl">
                                Ver ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}