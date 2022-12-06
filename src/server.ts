import { setupApp } from './app/config/app';

const start = async (): Promise<void> => {
    const app = await setupApp();
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
};

start();
