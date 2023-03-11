import { MovieType } from '@prisma/client';
import axios from 'axios';
import { MovieApi, snippetMovieApi } from '../../../entities/MovieApi';
import { IMovieApiRepository } from '../../../repositories';
import { IdGenerator } from '../providers';
import { MovieRepository } from './MovieRepository';

const movieRepository = new MovieRepository();
const idGenerator = new IdGenerator();

type IFind = {
    Response: string;
    Search: snippetMovieApi[];
    totalResults: string;
};

class MovieApiRepository implements IMovieApiRepository {
    async find(query: string, page: number): Promise<snippetMovieApi[]> {
        const options = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: { s: query, r: 'json', page },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY ?? ''
            }
        };

        let body: IFind;
        try {
            body = await (await axios.request(options)).data;
        } catch (err) {
            throw new Error('error searching movie in database');
        }

        if (body.Response === 'False') {
            return [];
        }

        const movies: snippetMovieApi[] = [];

        for (const movie of body.Search) {
            const movieExists: any = await movieRepository.findByImdbId(
                movie.imdbID
            );
            if (movieExists) {
                movie.isInDatabase = true;
                if (movieExists.movieType === MovieType.SUGGESTED) {
                    movie.wasWatched = false;
                } else {
                    movie.wasWatched = true;
                }
                movie.evaluations = movieExists._count.evaluations;
                movie.likes = movieExists._count.likes;
                movie.dislikes = movieExists._count.dislikes;
                let avg = 0;
                if (movieExists._count.evaluations > 0) {
                    for (let j = 0; j < movieExists.evaluations.length; j++) {
                        avg += movieExists.evaluations[j].rating;
                    }
                    avg /= movieExists.evaluations.length;
                }
                movie.rating = avg;
            } else {
                movie.isInDatabase = false;
                movie.wasWatched = false;
                movie.evaluations = 0;
                movie.likes = 0;
                movie.dislikes = 0;
                movie.rating = 0;
            }
            movies.push(movie);
        }

        return movies;
    }

    async create(imdbId: string): Promise<void> {
        const movieApi: MovieApi | null = await this.findById(imdbId);

        if (!movieApi) {
            throw new Error('error searching movie in database');
        }
        const id = await idGenerator.createId();
        await movieRepository.create({ ...movieApi, id });
    }

    async findById(imdbId: string): Promise<MovieApi | null> {
        const options = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: { i: imdbId, r: 'json' },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY ?? ''
            }
        };

        let body: MovieApi & IFind;
        try {
            body = await (await axios.request(options)).data;
        } catch (err) {
            throw new Error('error searching in database.');
        }

        if (body.Response === 'False') {
            return null;
        }
        return body;
    }
}

export { MovieApiRepository };
