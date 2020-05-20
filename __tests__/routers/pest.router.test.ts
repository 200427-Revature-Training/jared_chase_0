import express from 'express';
import bodyParser from 'body-parser';
import { pestRouter } from '../../src/routers/pest.router';
import * as pestService from '../../src/services/pest.service';
import request from 'supertest';

jest.mock('../../src/services/pest.service');
const mockPestService = pestService as any;

const app = express();
app.use(bodyParser.json())
app.use('/pest', pestRouter);

describe('GET /pest', () => {
    test('Returns normally under normal circumstances', async () => {
        mockPestService.getAllPests.mockImplementation(async () => []);
        await request(app)
            .get('/pest')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockPestService.getAllPests.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/pest')
            .expect(500)
    });
});

describe('POST /pest', () => {
    test('Succesful creation should return 201 status', async () => {
        mockPestService.savePest.mockImplementation(async () => ({}));

        const payload = {
            pestType: 'cat'
        };

        await request(app)
            .post('/pest')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockPestService.savePest.mockImplementation(async () => {throw new Error()});

        const payload = {
            pestName: 'cat'
        };

        await request(app)
            .post('/pest')
            .send(payload)
            .expect(500);
    });
});

describe('GET /pest/:id', () => {
    test('Normal behavior Json with status 200', async() => {
        mockPestService.getPestById.mockImplementation(async () => ({}));

        await request(app)
            .get('/pest/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockPestService.getPestById.mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/pest/99')
            .expect(500)
    });
});