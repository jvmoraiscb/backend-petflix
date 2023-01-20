import { Movie } from '../entities';

interface ITrendingRepository {
    get(): Promise<Movie[]>;
}

export { ITrendingRepository };
