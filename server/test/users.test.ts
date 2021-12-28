import axios from 'axios';
import * as request from 'supertest';
import { app } from '../app';

describe('Testing users', () => {
    it('should test users', async () => {
        const req = await request(app).get('/users')
        expect(req.body[0]).toHaveProperty('password')
        expect(req.statusCode).toEqual(200)
    })
})