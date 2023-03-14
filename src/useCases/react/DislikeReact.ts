import { object, string } from 'yup';
import {
    IMovieApiRepository,
    IMovieRepository,
    IReactRepository
} from '../../repositories';

const bodySchema = object({
    imdbId: string().required().min(1)
});

class DislikeReact {
    constructor(
        private reactRepository: IReactRepository,
        private movieRepository: IMovieRepository,
        private movieApiRepository: IMovieApiRepository
    ) {}

    async execute(userId: string, body: any): Promise<void> {
        body = await bodySchema.validate(body);
        const { imdbId } = body;

        const movie = await this.movieRepository.findByImdbId(imdbId);
        if (!movie) {
            await this.movieApiRepository.create(imdbId);
        }
        const likeStatus = await this.reactRepository.getLikeStatus(
            userId,
            imdbId
        );
        if (likeStatus === 'none')
            await this.reactRepository.dislike(userId, imdbId);
        else if (likeStatus === 'disliked')
            await this.reactRepository.removeDislike(userId, imdbId);
    }
}

export { DislikeReact };
