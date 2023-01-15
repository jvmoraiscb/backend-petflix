import { v4 } from 'uuid';
import { IIdGenerator } from '../providers';

class IdGenerator implements IIdGenerator {
    async createId(): Promise<string> {
        return v4();
    }
}

export { IdGenerator };
