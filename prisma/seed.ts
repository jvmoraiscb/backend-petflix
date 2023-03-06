import { PrismaClient } from '@prisma/client';
import {
    PasswordEncrypter,
    IdGenerator
} from '../src/app/implementation/providers';

const passwordEncrypter = new PasswordEncrypter();
const idGenerator = new IdGenerator();
const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            id: await idGenerator.createId(),
            email: process.env.ADMIN_EMAIL ?? '',
            name: 'PET EngComp',
            password: await passwordEncrypter.encryptPassword(
                process.env.ADMIN_PASSWORD ?? ''
            ),
            profilePic: 32,
            role: 'ADMIN'
        }
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
