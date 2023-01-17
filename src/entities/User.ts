import { Evaluation } from './Evaluation'
import { Movie } from './Movie'

type User = {
    id: string
    email: string
    password: string
    name: string
    profilePic: string
    evaluations: Evaluation[]
    movies: Movie[]
    createdAt: Date
    updatedAt: Date
}

export { User }
