interface ITokenHelper {
    createToken(email: string, secret: string): Promise<string>;
    verifyToken(token: string, secret: string): Promise<boolean>;
}

export { ITokenHelper };
