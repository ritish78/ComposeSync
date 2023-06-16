const request = require("supertest");
process.env.EXPRESS_SERVER_PORT = 5002;
const app  = require('../server');

const newUserValidInfo = {
    name: 'Test User',
    email: 'testuser3@email.com',
    password: 'password',
    confirmPassword: 'password'
}

const userAlreadyCreated = {
    name: 'Test User',
    email: 'testuser@email.com',
    password: 'password',
    confirmPassword: 'password'
}

const newUserWithShortPassword = {
    name: 'Test User',
    email: 'testinguser@email.com',
    password: 'pass',
    confirmPassword: 'pass'
}

const userWithInvalidEmail = {
    name: 'Another User',
    email: 'anotheruser.com',
    password: 'password#1',
    confirmPassword: 'password#1'
}

describe('api/users', () => {
    describe('register user end point', () => {
        it('should register with all info provided and return JWT', async () => {
            const response = await request(app)
                                .post('/api/users')
                                .send(newUserValidInfo);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return errors when we provide empty user info', async () => {
            const response = await request(app)
                                .post('/api/users')
                                .send({
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: ''
                                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors).toBeDefined();
        });


        it('should return error when we try to create an account with already registered email', async () => {
            const response = await request(app)
                                    .post('/api/users')
                                    .send(userAlreadyCreated);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].message).toBe('User already exists!');
        });


        it('should return error when we input password that does not meet criteria', async () => {
            const response = await request(app)
                                    .post('/api/users')
                                    .send(newUserWithShortPassword);

            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('Please enter a password with 8 or more characters')
        });


        it('should return error when we input invalid email', async () => {
            const response = await request(app)
                                    .post('/api/users')
                                    .send(userWithInvalidEmail);
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('Valid email is required');
        })
    })
}) 