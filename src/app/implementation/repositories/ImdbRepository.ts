import axios from 'axios'
import { Movie, SnippetMovie } from '../../../entities'
import { IImdbRepository } from '../../../repositories'

class ImdbRepository implements IImdbRepository {
    async search(
        query: string,
        page: number
    ): Promise<{ movies: SnippetMovie[]; totalResults: number } | null> {
        const options = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: { s: query, r: 'json', page: page },
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API_KEY ?? '',
                'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
            },
        }

        const body: any = await axios
            .request(options)
            .then(function (response) {
                return response.data
            })
            .catch(function () {
                return null
            })

        if (body['Response'] === 'False') {
            return null
        }
        const totalResults: number = parseInt(body['totalResults'])
        const movies = await this.toSnippets(body)

        return { movies, totalResults }
    }

    async findById(
        imdbId: string
    ): Promise<Omit<
        Movie,
        'id' | 'evaluationsId' | 'usersId' | 'createdAt' | 'updatedAt'
    > | null> {
        const options = {
            method: 'GET',
            url: 'https://movie-database-alternative.p.rapidapi.com/',
            params: { r: 'json', i: imdbId },
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API_KEY ?? '',
                'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
            },
        }

        const body: any = await axios
            .request(options)
            .then(function (response) {
                return response.data
            })
            .catch(function () {
                return null
            })

        if (body['Response'] === 'False') {
            return null
        }

        const title: string = body['Title']
        const year: string = body['Year']
        const runtime: string = body['Runtime']
        const type: string = body['Type']
        const genre: string = body['Genre']
        const director: string = body['Director']
        const writer: string = body['Writer']
        const actors: string = body['Actors']
        const plot: string = body['Plot']
        const poster: string = body['Poster']

        return {
            imdbId,
            title,
            year,
            runtime,
            type,
            genre,
            director,
            writer,
            actors,
            plot,
            poster,
        }
    }

    private async toSnippets(body: any): Promise<SnippetMovie[]> {
        let snippetMovies: SnippetMovie[] = []
        for (var i = 0; i < body['Search'].length; i++) {
            const title: string = body['Search'][i]['Title']
            const year: string = body['Search'][i]['Year']
            const imdbId: string = body['Search'][i]['imdbID']
            const type: string = body['Search'][i]['Type']
            const poster: string = body['Search'][i]['Poster']
            snippetMovies.push({ title, imdbId, year, type, poster })
        }
        return snippetMovies
    }
}

export { ImdbRepository }
