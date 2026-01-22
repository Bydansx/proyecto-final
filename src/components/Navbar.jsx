import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {

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
                        to="/populares"
                        className={({ isActive }) =>
                            isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200 transition"
                        }
                    >
                        Peliculas
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

                <div className="hidden md:block w-9 h-9 rounded-md">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmpmVuvv1O8Rcyh5bFgQxHeJSVG_WmWuWmA&s"/>
                </div>
            </div>
        </nav>
    );
}