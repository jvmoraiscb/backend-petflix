import path from 'path';
import * as fs from 'fs';

class AmountOfAvatars {
    constructor() {}
    async execute(): Promise<number> {
        return fs.readdirSync(path.resolve(__dirname, '../../../public/avatar'))
            .length;
    }
}

export { AmountOfAvatars };
