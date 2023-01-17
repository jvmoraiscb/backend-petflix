interface ITokenGenerator {
    createToken(userId: string): Promise<string>;
    verifyToken(token: string): Promise<string | null>;
}

export { ITokenGenerator };
