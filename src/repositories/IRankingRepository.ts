export type BestMoviesDTO = {
    title: string;
    rating: number;
};

export type MostEvaluationsDTO = {
    name: string;
    total: number;
};

export interface IRankingRepository {
    mostEvaluations(): Promise<MostEvaluationsDTO[]>;
    bestMovies(): Promise<BestMoviesDTO[]>;
}
