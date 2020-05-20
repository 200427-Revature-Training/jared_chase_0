import express from 'express';
import bodyParser from 'body-parser';
import { exterminatorRouter } from '../../src/routers/exterminator.router';
import * as exterminatorService from '../../src/services/exterminator.service';
import request from 'supertest';

jest.mock('../../src/services/exterminator.service');
const mockExterminatorService = exterminatorService as any;

const app = express();
app.use(bodyParser.json())
app.use('/exterminator', exterminatorRouter);

describe('GET /exterminator', () => {
    test('Returns normally under normal circumstances', async () => {
        mockExterminatorService.getAllExterminators.mockImplementation(async () => []);
        await request(app)
            .get('/exterminator')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockExterminatorService.getAllExterminators.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/exterminator')
            .expect(500);
    });
});

describe('POST /exterminator', ()  => {
    test('Succesful creation should retrun 201 status', async () => {
        mockExterminatorService.saveExterminator.mockImplementation(async () => ({}));

        const payload = {
            firstName: 'gerald',
            lastName: 'karey',
            phoneNumber: '876-234-4567',
            emailAddress: 'email@email.com'
        };

        await request (app)
            .post('/exterminator')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
        });

        test('Should return 500 when encountering an error', async () => {
            mockExterminatorService.saveExterminator.mockImplementation(async () => {throw new Error()});

            const payload = {
                firstName: 'gerald',
                lastName: 'karey',
                phoneNumber: '876-234-4567',
                emailAddress: 'email@email.com'
            };

            await request(app)
                .post('/client') 
                .send(payload)
                .expect(500);
        });
    });

    describe('GET /exterminator/:id', () => {
        test('Normal behavior Json with status 200', async () => {
            mockExterminatorService.getExterminatorById.mockImplementation(async () => ({}));

            await request(app)
                .get('/client/1')
                .expect(200)
                .expect('content-type', 'application/json; charset=utf-8')
        });

        test('No objet found (404)', async() => {
            mockExterminatorService.getExterminatorById.mockImplementation(async () => {throw new Error()});

            await request(app)
                .get('/exterminator/99')
                .expect(500)
        });
    });