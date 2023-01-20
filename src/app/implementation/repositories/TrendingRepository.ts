import { Movie } from '../../../entities';
import { ITrendingRepository } from '../../../repositories';
import { database } from '../../config/database';

class TrendingRepository implements ITrendingRepository {
    async get(): Promise<Movie[]> {
        const movies = await database.prismaMovie.findMany();
        return movies;
    }
}

export { TrendingRepository };
