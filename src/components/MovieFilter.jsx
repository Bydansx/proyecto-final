import React, { useEffect, useState } from 'react';
import { ApiMovie } from '../services/api-movie';

export default function MovieFilter({ onFilterChange }) {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const years = Array.from({ length: 31 }, (_, i) => new Date().getFullYear() - i);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const genreList = await ApiMovie.getGenres();
                if (Array.isArray(genreList)) {
                    setGenres(genreList);
                }
            } catch (error) {
                console.error("Error cargando géneros:", error);
            }
        };
        loadGenres();
    }, []);

    useEffect(() => {
        onFilterChange({ genre: selectedGenre, year: selectedYear });
    }, [selectedGenre, selectedYear, onFilterChange]);

    return (
        <div className="flex flex-col md:flex-row gap-5 mb-10 bg-zinc-900/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="flex-1 group">
                <label className="block text-zinc-500 text-[10px] font-black uppercase mb-2 tracking-[0.2em] group-focus-within:text-red-600 transition-colors">
                    Categoría
                </label>

                {/*Filtro de los generos*/}
                <div className="relative">
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full bg-zinc-950 text-white text-sm rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-red-600 transition-all appearance-none cursor-pointer"
                    >
                        <option value="">Todos los géneros</option>
                        {genres.map(genre => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            {/*Filtro del a;o*/}
            <div className="md:w-48 group">
                <label className="block text-zinc-500 text-[10px] font-black uppercase mb-2 tracking-[0.2em] group-focus-within:text-red-600 transition-colors">
                    Año de Estreno
                </label>
                <div className="relative">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full bg-zinc-950 text-white text-sm rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-red-600 transition-all appearance-none cursor-pointer"
                    >
                        <option value="">Cualquier año</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

            {/*Boton para limpiar el filtro*/}
            <button
                onClick={() => { setSelectedGenre(''); setSelectedYear(''); }}
                className="self-end mb-1 px-4 py-3 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
                Limpiar
            </button>
        </div>
    );
}