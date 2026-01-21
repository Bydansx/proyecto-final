import React, { useEffect, useState } from "react";
import { ApiMovie } from "../services/api-movie.js";
import Swipe from "../components/Swipe.jsx";
import Modal from "../components/Modal.jsx";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const fetchMovies = async () => {
        {/*Traemos los Estrenos*/}
        const response = await ApiMovie.getNowPlaying();
        setMovies(response.results);
    };

    const handleOpenModal = (movie) => {
        setSelectedMovie(movie);
        setIsOpenModal(true);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="bg-zinc-950 min-h-screen">
            {movies.length > 0 && (
                <Swipe
                    movies={movies}
                    onMovieClick={handleOpenModal}
                />
            )}
            {/*Para ver detalles en una pelicula si hacen click*/}
            <Modal
                isOpen={isOpenModal}
                movie={selectedMovie}
                onClose={() => setIsOpenModal(false)}
            />
        </div>
    );
}