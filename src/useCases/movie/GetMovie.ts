import { Movie } from '@prisma/client';
import { object, string } from 'yup';
import {
    IMovieApiRepository,
    IMovieRepository,
    IReactRepository
} from '../../repositories';

const bodySchema = object({
    imdbId: string().required().min(1)
});

class GetMovie {
    constructor(
        private movieRepository: IMovieRepository,
        private reactRepository: IReactRepository,
        private movieApiRepository: IMovieApiRepository
    ) {}

    async execute(
        userId: string,
        body: any
    ): Promise<(Movie & { likeStatus: string; rating: number }) | any> {
        body = await bodySchema.validate(body);
        const { imdbId } = body;
        const movie = await this.movieRepository.findByImdbId(imdbId);
        if (!movie) {
            const movieApi = await this.movieApiRepository.findById(imdbId);
            if (!movieApi) {
                throw new Error('movie does not exists');
            }
            return {
                id: undefined,
                imdbId: movieApi.imdbID,
                title: movieApi.Title,
                type: movieApi.Type,
                runtime: movieApi.Runtime,
                year: movieApi.Year,
                genre: movieApi.Genre,
                plot: movieApi.Plot,
                poster: movieApi.Poster,
                director: movieApi.Director,
                writer: movieApi.Writer,
                actors: movieApi.Actors,
                movieType: 'SUGGESTED',
                createdAt: undefined,
                updatedAt: undefined,
                evaluations: [],
                _count: {
                    likes: 0,
                    dislikes: 0,
                    evaluations: 0
                },
                rating: 0,
                likeStatus: 'none'
            };
        }
        const likeStatus = await this.reactRepository.getLikeStatus(
            userId,
            imdbId
        );
        return { ...movie, likeStatus };
    }
}

export { GetMovie };
