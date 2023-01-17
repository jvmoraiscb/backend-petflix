import { ITokenGenerator } from '../providers'
import { IUsersRepository } from '../repositories'

const authorizationUser = async (
    header: {
        authorization?: string
    },
    tokenGenerator: ITokenGenerator,
    usersRepository: IUsersRepository
): Promise<string> => {
    if (header.authorization === undefined) {
        throw new Error('unauthorized')
    }
    const token = header.authorization.split(' ')[1]
    const id = await tokenGenerator.verifyToken(token)

    if (!id) {
        throw new Error('unauthorized')
    }
    const userExists = await usersRepository.findById(id)
    if (userExists === null) {
        throw new Error('unauthorized')
    }

    return id
}

export { authorizationUser }
