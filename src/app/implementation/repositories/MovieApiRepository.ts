import { MovieType } from '@prisma/client';
import axios from 'axios';
import { MovieApi, snippetMovie } from '../../../entities';
import { IMovieApiRepository } from '../../../repositories';
import { IdGenerator } from '../providers';
import { MovieRepository } from './MovieRepository';

const movieRepository = new MovieRepository();
const idGenerator = new IdGenerator();

type IFind = {
    Response: string;
    Search: MovieApi[];
    totalResults: string;
};

class MovieApiRepository implements IMovieApiRepository {
    async find(
        query: string,
        page: number
    ): Promise<{ movies: snippetMovie[]; totalResults: number }> {
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
            return { movies: [], totalResults: 0 };
        }
        const movies: snippetMovie[] = [];
        for (const movie of body.Search) {
            const movieExists: any = await movieRepository.findByImdbId(
                movie.imdbID
            );
            const imdbId = movie.imdbID;
            const poster = movie.Poster;
            let wasWatched = false;
            let evaluations = 0;
            let likes = 0;
            let dislikes = 0;
            let rating = 0;
            if (movieExists) {
                wasWatched =
                    movieExists.movieType === MovieType.WATCHED ? true : false;
                evaluations = movieExists._count.evaluations;
                likes = movieExists._count.likes;
                dislikes = movieExists._count.dislikes;
                let avg = 0;
                if (movieExists._count.evaluations > 0) {
                    for (let j = 0; j < movieExists.evaluations.length; j++) {
                        avg += movieExists.evaluations[j].rating;
                    }
                    avg /= movieExists.evaluations.length;
                }
                rating = avg;
            }
            movies.push({
                wasWatched,
                imdbId,
                poster,
                evaluations,
                rating,
                likes,
                dislikes
            });
        }

        return { movies: movies, totalResults: parseInt(body.totalResults) };
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
