import React, { useEffect, useState, useCallback } from "react";
import { ApiMovie } from "../services/api-movie.js";
import { buildUrlImage } from "../utils/buildUrlImage.js";
import Modal from "./Modal.jsx";
import Searchbar from "./Searchbar.jsx";
import MovieFilter from "./MovieFilter.jsx";
import Pagination from "./Pagination.jsx";


export default function PopularMovies() {
    const [movies, setMovies] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeFilters, setActiveFilters] = useState({ genre: '', year: '' });

    const fetchPopularMovies = async (page = 1) => {
        const response = await ApiMovie.getPopularMovies(page);
        setMovies(response.results);
        setTotalPages(response.total_pages);
    };

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setIsOpenModal(true);
    };

    const handleSearch = async (query) => {
        if (query.trim() === "") {
            fetchPopularMovies(1);
            return;
        }
        const response = await ApiMovie.searchMovies(query);
        setMovies(response.results);
        setTotalPages(response.total_pages)
    };

    const handleFilterChange = useCallback(async ({ genre, year }) => {
        // Guardamos los filtros para que la paginación sepa qué pedir
        setActiveFilters({ genre, year });
        setCurrentPage(1); //Volver a la pagina 1 despues de filtrar

        try {
            if (!genre && !year) {
                const data = await ApiMovie.getPopularMovies(1);
                setMovies(data.results);
                setTotalPages(data.total_pages);
                return;
            }
            const data = await ApiMovie.discoverMovies(genre, year, 1);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error al filtrar películas:", error);
        }
    }, []);
    const handlePageChange = async (page) => {
        setCurrentPage(page);

        // Efecto para subir despues de sleccinar pagina
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (!activeFilters.genre && !activeFilters.year) {

            await fetchPopularMovies(page);
        } else {

            const data = await ApiMovie.discoverMovies(activeFilters.genre, activeFilters.year, page);
            setMovies(data.results);
        }
    };

    useEffect(() => {
        fetchPopularMovies(1);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-10 border-l-4 border-red-600 pl-4">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Películas Populares
                </h1>
                <Searchbar onSearch={handleSearch} />
                <span className="text-sm font-medium text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">
                    {movies.length} resultados
                </span>
            </div>

            <MovieFilter onFilterChange={handleFilterChange} />

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {movies && movies.map((movie) => ( // Agregada validación movies &&
                    <li
                        key={movie.id}
                        onClick={() => handleOpenModal(movie)}
                        className="group relative bg-zinc-900 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-red-900/20"
                    >
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                                src={buildUrlImage(movie.poster_path)}
                                alt={movie.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-4">
                            <h2 className="text-sm font-bold text-white line-clamp-1 group-hover:text-red-500 transition-colors">
                                {movie.title}
                            </h2>
                            <div className="flex items-center justify-between mt-3 text-white">
                                <span className="text-xs font-semibold text-zinc-500">
                                    {movie.release_date?.slice(0, 4)}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
                                    ★ {movie.vote_average?.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <Modal
                isOpen={isOpenModal}
                movie={selectedMovie}
                onClose={() => setIsOpenModal(false)}
            />
        </div>
    );
}