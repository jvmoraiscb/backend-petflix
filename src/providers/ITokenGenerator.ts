interface ITokenGenerator {
    createToken(email: string): Promise<string>;
    verifyToken(token: string): Promise<string | null>;
}

export { ITokenGenerator };
