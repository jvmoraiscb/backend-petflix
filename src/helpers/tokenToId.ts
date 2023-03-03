import { TokenGenerator, UserRepository } from '../app/implementation';

const tokenGenerator = new TokenGenerator();
const userRepository = new UserRepository();

const tokenToId = async (authorization: string): Promise<string | null> => {
    const id = await tokenGenerator.verifyToken(authorization);
    if (!id) {
        return null;
    }
    const userExists = await userRepository.findById(id);
    if (userExists === null) {
        return null;
    }
    return id;
};

export { tokenToId };
