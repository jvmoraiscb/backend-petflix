interface IPasswordHelper {
    hashPassword(password: string): Promise<string>;
    verifyPassword(pass1: string, pass2: string): Promise<boolean>;
}

export { IPasswordHelper };
