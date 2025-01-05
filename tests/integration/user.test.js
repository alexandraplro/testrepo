const request = require('supertest');
const app = require('../src/app'); // Import your Express app
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should log in an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined(); // Check if token is returned
    });

    it('should fail to log in with incorrect credentials', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'wrongpassword'
            });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credentials');
    });
});
