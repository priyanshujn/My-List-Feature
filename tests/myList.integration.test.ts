// tests/myList.integration.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app';

let mongo: MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
});

it('adds and lists item', async () => {
    await request(app).post('/api/my-list').send({
        contentId: 'movie1',
        contentType: 'MOVIE'
    });

    const res = await request(app).get('/api/my-list');
    expect(res.body.items.length).toBe(1);
});
