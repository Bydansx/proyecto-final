import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Swipe({ movies, onMovieClick }) {

    // Si no tenemos peliculas, no muestra nada
    if (!movies || movies.length === 0) return null;

    return (
        <section className="w-full mb-10 overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                loop={true}
                className="h-[60vh] md:h-[85vh] w-full"
            >
                {/* para mostrar estrenos */}
                {movies.slice(0, 10).map((movie) => (
                    <SwiperSlide key={movie.id} onClick={() => onMovieClick(movie)}>
                        <div className="relative w-full h-full cursor-pointer group">

                            {/* Imagen */}
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-98"
                            />

                            {/* Overlays de degradado estilo Netflix */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 to-transparent" />

                            {/* Información */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-3/4 z-10">
                                <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded mb-4 inline-block tracking-[0.2em]">
                                    Estreno Exclusivo
                                </span>
                                <h2 className="text-4xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
                                    {movie.title}
                                </h2>
                                <p className="text-zinc-300 text-sm md:text-lg line-clamp-3 max-w-2xl hidden md:block drop-shadow-md font-medium">
                                    {movie.overview}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style jsx global>{`
                .swiper-pagination-bullet { background: #52525b !important; opacity: 1; }
                .swiper-pagination-bullet-active { background: #e11d48 !important; width: 30px; border-radius: 4px; }
                .swiper-button-next, .swiper-button-prev { color: white !important; transform: scale(0.7); }
            `}</style>
        </section>
    );
}