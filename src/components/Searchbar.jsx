import {useState} from "react";

export default function Searchbar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query); //Hace la busqueda
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex-1 max-w-md relative group"
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca tu pelicula..."
                className="w-full bg-zinc-900 text-white text-sm rounded-full px-5 py-2 border border-white/10 focus:outline-none focus:border-red-600 transition-all"
            />
            <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </button>
        </form>
    );
}