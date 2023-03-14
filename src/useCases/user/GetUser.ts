import { MovieType, User } from '@prisma/client';
import { snippetMovie } from '../../entities';
import { IUserRepository } from '../../repositories';

class GetUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(userId: string): Promise<{
        user: User;
        likedMovies: snippetMovie[];
        evaluations: any;
    } | null> {
        const userFull: any = await this.userRepository.findById(userId);
        const user = await this.userRepository.findByEmail(userFull.email);
        if (!userFull || !user) {
            return null;
        }

        const likedMovies: snippetMovie[] = [];
        for (const movie of userFull.likes) {
            const { likes, dislikes, evaluations } = movie._count;
            const { imdbId, poster } = movie;
            let avg = 0;
            if (evaluations > 0) {
                for (let i = 0; i < evaluations; i++) {
                    avg += movie.evaluations[i].rating;
                }
                avg /= evaluations;
            }
            const rating = avg;
            const wasWatched =
                movie.movieType === MovieType.WATCHED ? true : false;

            likedMovies.push({
                wasWatched,
                imdbId,
                poster,
                evaluations,
                rating,
                likes,
                dislikes
            });
        }
        const evaluations = userFull.evaluations;

        return { user, likedMovies, evaluations };
    }
}

export { GetUser };
