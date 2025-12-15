import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createApp from '../src/app';
import { createInitalData } from '../scripts/data';
import { closeRedis } from '../src/config/redisClient';

process.env.NODE_ENV = "test";

let mongo: MongoMemoryServer;
let app: any;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
    await createInitalData();

    app = createApp();
});

afterAll(async () => {
    await closeRedis();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close(true);
    await mongo.stop({ doCleanup: true, force: true });
});


describe('My List Integration Tests', () => {

    it('should add an item to my list', async () => {
        const res = await request(app)
            .post('/api/my-list')
            .send({ contentId: 'movie_1', contentType: 'MOVIE' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should add an non-existing item to my list', async () => {
        const res = await request(app)
            .post('/api/my-list')
            .send({ contentId: 'movie_11', contentType: 'MOVIE' });

        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
    });

    it('should not add duplicate items', async () => {
        await request(app)
            .post('/api/my-list')
            .send({ contentId: 'movie_1', contentType: 'MOVIE' });

        const res = await request(app).get('/api/my-list');
        expect(res.body.items.length).toBe(1);
    });

    it('should not add unknown items', async () => {
        await request(app)
            .post('/api/my-list')
            .send({ contentId: 'movie_10', contentType: 'MOVIE' });

        const res = await request(app).get('/api/my-list');
        expect(res.body.items.length).toBe(1);
    });

    it('should list items with pagination', async () => {
        await request(app)
            .post('/api/my-list')
            .send({ contentId: 'movie_2', contentType: 'MOVIE' });

        const res = await request(app)
            .get('/api/my-list?page=1&limit=1');

        expect(res.status).toBe(200);
        expect(res.body.items.length).toBe(1);
        expect(res.body.pagination.total).toBe(2);
    });

    it('should remove an item from my list', async () => {
        const res = await request(app)
            .delete('/api/my-list/movie_1');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);

        const list = await request(app).get('/api/my-list');
        expect(list.body.items.length).toBe(1);
    });

    it('should allow removing non-existing item (idempotent)', async () => {
        const res = await request(app)
            .delete('/api/my-list/non_existing');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should return validation error for invalid payload', async () => {
        const res = await request(app)
            .post('/api/my-list')
            .send({ contentType: 'MOVIE' }); // missing contentId

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Validation error');
    });

});
