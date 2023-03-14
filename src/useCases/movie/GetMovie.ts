import { Movie } from '@prisma/client';
import { object, string } from 'yup';
import { IMovieRepository, IReactRepository } from '../../repositories';

const bodySchema = object({
    imdbId: string().required().min(1)
});

class GetMovie {
    constructor(
        private movieRepository: IMovieRepository,
        private reactRepository: IReactRepository
    ) {}

    async execute(
        userId: string,
        body: any
    ): Promise<Movie & { likeStatus: string }> {
        body = await bodySchema.validate(body);
        const { imdbId } = body;
        const movie = await this.movieRepository.findByImdbId(imdbId);
        if (!movie) {
            throw new Error('movie does not exists');
        }
        const likeStatus = await this.reactRepository.getLikeStatus(
            userId,
            imdbId
        );
        return { ...movie, likeStatus };
    }
}

export { GetMovie };
