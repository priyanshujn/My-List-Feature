import express from 'express';
import authMiddleware from './middleware/auth';
import myListRoutes from './routes/myList.routes';

export default function createApp() {
    const app = express();

    app.use(express.json());

    app.use(authMiddleware);

    app.use('/api/my-list', myListRoutes);

    app.get('/health', (req, res) => res.json({ status: 'OK' }));

    app.use((err: any, req: any, res: any, next: any) => {
        console.error('Unhandled error:', err);
        res.status(500).json({ error: 'Unhandled server error' });
    });

    return app;
}