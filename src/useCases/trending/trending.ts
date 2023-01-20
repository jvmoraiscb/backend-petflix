import { Movie } from '../../entities';
import { ITrendingRepository } from '../../repositories';

class Trending {
    constructor(private trendingRepository: ITrendingRepository) {}
    async execute(): Promise<Movie[]> {
        const movies = this.trendingRepository.get();
        return movies;
    }
}

export { Trending };
