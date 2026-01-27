import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx"; //
import PopularMovies from "./components/PopularMovies.jsx";
import Favorites from "./pages/Favorites.jsx";

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
                            <Favorites />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;