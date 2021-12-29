import axios from 'axios';
import * as request from 'supertest';
import { app } from '../app';
import { getUsersService } from '../service/usersService';
describe('Testing database', () => {
    it('connection', async () => {
        await getUsersService()
    })
})

describe('Testing routes', () => {
    it('should test all users', async () => {
        const req = await request(app).get('/users')
        expect(req.body).toBeDefined()
        expect(typeof req.body).toBe('object')
        expect(req.statusCode).toEqual(200)
    })

    it('Should test user by email', async () => {
        const req = await request(app).get('/users/:email')
        expect(req.body).toBeDefined()
        expect(typeof req.body).toBe('object')
        expect(req.statusCode).toEqual(200)
    })

    it('Should test post user', async () => {
        const req = await request(app).post('/users').send({
            email: "willianccc@gmail.com",
            password: "123123123"
        })
        expect(req.statusCode).toEqual(200)
    })

    it('Should test delete user', async () => {
        const req = await request(app).delete('/deleteuser/:email/:password')
        expect(req.statusCode).toEqual(200)
    })

    it('Should test get auth', async () => {
        const req = await request(app).get('/verifyauth/:token')
        expect(req.statusCode).toEqual(200)
    })
})
