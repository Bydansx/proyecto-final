import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApiMovie } from "./services/api-movie.js";
import { buildUrlImage } from "./utils/buildUrlImage.js";
import Modal from "./components/Modal.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    const [movies, setMovies] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchPopularMovies = async () => {
        const response = await ApiMovie.getPopularMovies();
        setMovies(response.results);
    };

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setIsOpenModal(true);
    };

    const handleSearch = async (query) => {
        if (query.trim() === "") {
            fetchPopularMovies(); // Si el buscador está vacío, volvemos a las populares
            return;
        }
        const response = await ApiMovie.searchMovies(query);
        setMovies(response.results);
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <Router>
            <div className="bg-zinc-950 min-h-screen">
                <Navbar  onSearch={handleSearch} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="max-w-7xl mx-auto px-6 py-10">
                                <div className="flex items-center justify-between mb-10 border-l-4 border-red-600 pl-4">
                                    <h1 className="text-3xl font-bold text-white tracking-tight">
                                        Películas Populares
                                    </h1>
                                    <span className="text-sm font-medium text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">
                                        {movies.length} resultados
                                    </span>
                                </div>

                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                    {movies.map((movie) => (
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

                                                <div className="flex items-center justify-between mt-3">
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
                            </div>
                        }
                    />

                    <Route
                        path="/favoritos"
                        element={
                            <div className="max-w-7xl mx-auto px-6 py-10">
                                <h1 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">Mis Favoritos</h1>
                                <p className="text-zinc-500 italic">Aquí aparecerán las películas que guardes en Supabase.</p>
                            </div>
                        }
                    />
                </Routes>

                <Modal
                    isOpen={isOpenModal}
                    movie={selectedMovie}
                    onClose={() => setIsOpenModal(false)}
                />
            </div>
        </Router>
    );
}

export default App;