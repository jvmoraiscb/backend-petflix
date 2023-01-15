interface IPasswordEncrypter {
    encryptPassword(password: string): Promise<string>;
    verifyPassword(pass1: string, pass2: string): Promise<boolean>;
}

export { IPasswordEncrypter };
