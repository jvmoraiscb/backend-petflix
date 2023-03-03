import { object, string } from 'yup';
import { IAdminRepository, IMovieRepository } from '../../repositories';

const bodySchema = object({
    imdbId: string().required().min(1)
});

class RemoveWatchedAdmin {
    constructor(
        private adminRepository: IAdminRepository,
        private movieRepository: IMovieRepository
    ) {}
    async execute(body: any): Promise<void> {
        body = await bodySchema.validate(body);
        const { imdbId } = body;

        const movie = await this.movieRepository.findByImdbId(imdbId);
        if (!movie) {
            throw new Error('movie does not exists in database');
        }

        await this.adminRepository.removeWatched(imdbId);
    }
}

export { RemoveWatchedAdmin };
