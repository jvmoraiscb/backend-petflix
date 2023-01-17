import { Movie } from './Movie'
import { User } from './User'

type Evaluation = {
    id: string
    rating: number
    comment: string
    user: User
    movie: Movie
    createdAt: Date
    updatedAt: Date
}

export { Evaluation }
