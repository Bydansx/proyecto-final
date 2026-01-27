import React, { useEffect, useState } from 'react';
import { supabase } from '../constants/supabaseClient';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const { data } = await supabase
                .from('favorites')
                .select('*')
                .order('created_at', { ascending: false });
            setFavorites(data || []);
        };
        fetchFavorites();
    }, []);

    const removeFavorite = async (id) => {
        const { error } = await supabase.from('favorites').delete().eq('movie_id', id);
        if (!error) setFavorites(favorites.filter(m => m.movie_id !== id));
    };

    return (
        <div className="min-h-screen bg-black text-white p-10 pt-28">
            <h1 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">Mis Favoritos</h1>

            {favorites.length === 0 ? (
                <p className="text-zinc-500">No has guardado películas aún.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {favorites.map((movie) => (
                        <div key={movie.movie_id} className="relative group rounded-lg overflow-hidden border border-white/10 transition-transform hover:scale-105">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full aspect-[2/3] object-cover"
                            />
                            <div className="absolute inset-0 bg-black/80 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => removeFavorite(movie.movie_id)}
                                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}