import axios from 'axios';
import { MovieApi } from '../../../entities/MovieApi';
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
    async find(query: string, page: number): Promise<MovieApi[]> {
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
        return body.Search;
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
