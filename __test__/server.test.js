const request = require("supertest");
const app  = require('../server');
process.env.EXPRESS_SERVER_PORT = 5001;

describe('check if jest is working', () => {
    describe('get jest to test', () => {
        it('should pass the test', () => {
            expect(true).toBe(true);
        })
    })
})


describe('check if server is running', () => {
    describe('get request on root url', () => {
        it('should return API Working fine', async () => {
            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('API Working fine')
        });

        it ('should return 404', async () => {
            const response = await request(app).get('/test');
            expect(response.status).toBe(404);
        });
    })
})


// describe('mongodb connection', () => {
//     describe('connect to mongodb using mongoose', () => {
//        beforeAll(async () => {
//             await connectMongo();
//        })

//        afterAll(async () => {
//             await closeMongo();
//        })
//     })
// })

