import express from 'express';
import bodyParser from 'body-parser';
import { clientRouter } from '../../src/routers/client.router';
import * as clientService from '../../src/services/client.service';
import request from 'supertest';

jest.mock('../../src/services/client.service');
const mockClientService = clientService as any;

const app = express();
app.use(bodyParser.json())
app.use('/client', clientRouter);

describe('GET /client', () => {
    test('Returns normally under normal circumstances', async () => {
        mockClientService.getAllClients.mockImplementation(async () => []);
        await request(app)
            .get('/client')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockClientService.getAllClients.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/client')
            .expect(500);
    });
});

describe('POST /client', () => {
    test('Succesful creation should return 201 status', async () => {
        mockClientService.saveClient.mockImplementation(async () => ({}));

        const payload = {
            firstName: 'Mike',
            lastName: 'Dinger',
            streetAddress: '2323 Real St',
            phoneNumber: '567-876-3432',
            emailAddress: 'mail@address.com'
        };

        await request(app)
            .post('/client')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockClientService.saveClient.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'Mike',
            lastName: 'Dinger',
            streetAddress: '2323 Real St',
            phoneNumber: '567-876-3432',
            emailAddress: 'mail@address.com'
        };

        await request(app)
            .post('/client')
            .send(payload)
            .expect(500);
    });
});

describe('GET /client/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockClientService.getClientById.mockImplementation(async () => ({}));

        await request(app)
            .get('/client/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockClientService.getClientById.mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/client/99')
            .expect(500)
    });
});