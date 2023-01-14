interface ITokenHelper {
    createToken(email: string): Promise<string>;
    verifyToken(token: string): Promise<string | null>;
}

export { ITokenHelper };
