import { Movie } from '@prisma/client';
import { object, string } from 'yup';
import { IMovieRepository } from '../../repositories';

const bodySchema = object({
    imdbId: string().required().min(1)
});

class GetMovie {
    constructor(private movieRepository: IMovieRepository) {}

    async execute(body: any): Promise<Movie> {
        body = await bodySchema.validate(body);
        const { imdbId } = body;
        const movie = await this.movieRepository.findByImdbId(imdbId);
        if (!movie) {
            throw new Error('movie does not exists');
        }
        return movie;
    }
}

export { GetMovie };
