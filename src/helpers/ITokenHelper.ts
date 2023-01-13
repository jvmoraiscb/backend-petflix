interface ITokenHelper {
    createToken(email: string): Promise<string>;
    verifyToken(token: string): Promise<string>;
}

export { ITokenHelper };
