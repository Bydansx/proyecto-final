import {movieInstance} from "../http/api-movie.instance.js";


export class ApiMovie {
    static async getPopularMovies() {
        const response = await movieInstance.get('/movie/popular',
            {
                params: {
                    language: 'es-MX'
                }
            }
            );
        return response.data;
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
}