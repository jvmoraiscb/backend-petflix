import { object, string } from 'yup';
import { IMovieRepository, IReactRepository } from '../../repositories';

const bodySchema = object({
    imdbId: string().required().min(1)
});

class GetLikeStatus {
    constructor(
        private reactRepository: IReactRepository,
        private movieRepository: IMovieRepository
    ) {}

    async execute(userId: string, query: any): Promise<string> {
        query = await bodySchema.validate(query);
        const { imdbId } = query;

        const movie = await this.movieRepository.findByImdbId(imdbId);
        if (!movie) {
            return 'none';
        }
        return await this.reactRepository.getLikeStatus(userId, imdbId);
    }
}

export { GetLikeStatus };
