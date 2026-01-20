import { Link, NavLink } from 'react-router-dom';
import {useState} from "react";

export default function Navbar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query); //Hace la busqueda

};
    return (
        <nav className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Link to="/" className="text-red-600 text-2xl font-black uppercase tracking-tighter">
                    MagisXD
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200 transition"
                        }
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        to="/favoritos"
                        className={({ isActive }) =>
                            isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200 transition"
                        }
                    >
                        Mis Favoritos
                    </NavLink>
                </div>

                {/* Buscador */}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
                <div className="hidden md:block w-9 h-9 bg-red-600 rounded-md"></div>
            </div>
        </nav>
    );
}