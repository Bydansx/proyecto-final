import { movieInstance } from "../http/api-movie.instance.js";

export class ApiMovie {
    static async getPopularMovies(page = 1) {
        const response = await movieInstance.get('/movie/popular', {
            params: {
                language: 'es-MX',
                page: page
            }
        });
        return response.data; //
    }

    static async searchMovies(query) {
        const response = await movieInstance.get('/search/movie', {
            params: {
                query: query,
                language: 'es-MX'
            }
        });
        return response.data;
    }

    static async getNowPlaying() {
        const response = await movieInstance.get('/movie/now_playing');
        return response.data;
    }

    static async getGenres() {
        const response = await movieInstance.get('/genre/movie/list', {
            params: { language: 'es-MX' }
        });
        return response.data.genres;
    }

    static async discoverMovies(genreId, year, page = 1) {
        const response = await movieInstance.get('/discover/movie', {
            params: {
                with_genres: genreId,
                primary_release_year: year,
                sort_by: 'popularity.desc',
                language: 'es-MX',
                page: page
            }
        });
        return response.data;
    }
}