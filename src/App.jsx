import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx"; //
import PopularMovies from "./components/PopularMovies.jsx";

function App() {
    return (
        <Router>
            <div className="bg-zinc-950 min-h-screen font-sans">
                <Navbar />

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/populares" element={<PopularMovies />} />

                    <Route
                        path="/favoritos"
                        element={
                            <div className="max-w-7xl mx-auto px-6 py-10">
                                <h1 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-600 pl-4">Mis Favoritos</h1>
                                <p className="text-zinc-500 italic">Aquí aparecerán peliculas guardades en Supabase.</p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;