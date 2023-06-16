const request = require("supertest");
process.env.EXPRESS_SERVER_PORT = 5001;
const app  = require('../server');
const { connectMongo, closeMongo } = require('../config/db');

const validUserInfo = {
    email: 'testuser@email.com',
    password: 'password'
}

const invalidUserInfo = {
    email: 'test123@email.com',
    password: 'password123'
}

describe('API auth', () => {
    describe('get request on auth route', () => {
        describe('get current user info', () => {
            it('should return 401 as jwt is not provided', async () => {
                const response = await request(app).get('/api/auth');
                expect(response.status).toBe(401);
                
            }, 5000);
        })
    })

    describe('post request on auth route', () => {
        describe('validate user and get JWT', () => {
            it.concurrent('should return JWT when valid credentials are provided', async () => {
                const response = await request(app)
                                        .post('/api/auth')
                                        .send(validUserInfo);
                
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('token');
            }, 5000);

            it.concurrent('should return an error when invalid credentials are provided', async () => {
                const response = await request(app)
                                        .post('/api/auth')
                                        .send(invalidUserInfo);
                
                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty('errors');
                expect(response.body.errors).toBeDefined();
            }, 5000);

            it.concurrent('should return return error when some fields are missing', async () => {
                const response = await request(app)
                                        .post('/api/auth')
                                        .send({
                                            email: '',
                                            password: ''
                                        });

                expect(response.status).toBe(400);
                expect(response.body).toHaveProperty('errors');
                expect(response.body.errors).toBeDefined();
            }, 5000);
        })
    })
})
