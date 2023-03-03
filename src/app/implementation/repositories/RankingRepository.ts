import {
    BestMoviesDTO,
    IRankingRepository,
    MostEvaluationsDTO
} from '../../../repositories';
import { database } from '../../config/database';

class RankingRepository implements IRankingRepository {
    async mostEvaluations(): Promise<MostEvaluationsDTO[]> {
        const mostEvaluations: MostEvaluationsDTO[] = [];
        const query = await database.user.findMany({
            include: {
                _count: {
                    select: {
                        evaluations: true
                    }
                }
            },
            orderBy: {
                evaluations: {
                    _count: 'desc'
                }
            }
        });

        for (let i = 0; i < query.length; i++) {
            mostEvaluations.push({
                name: query[i].name,
                total: query[i]._count.evaluations
            });
        }
        return mostEvaluations;
    }

    async bestMovies(): Promise<BestMoviesDTO[]> {
        const bestMovies: BestMoviesDTO[] = [];
        const query = await database.movie.findMany({
            include: {
                evaluations: true
            }
        });
        for (let i = 0; i < query.length; i++) {
            let avg = 0;

            for (let j = 0; j < query[i].evaluations.length; j++) {
                avg += query[i].evaluations[j].rating;
            }

            avg /= query[i].evaluations.length;

            bestMovies.push({
                title: query[i].title,
                rating: avg
            });
        }
        bestMovies.sort((a, b) => a.rating - b.rating);
        return bestMovies;
    }
}

export { RankingRepository };
