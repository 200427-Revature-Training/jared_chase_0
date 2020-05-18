import express, { response } from 'express';
import * as clientService from '../services/client.service';

export const clientRouter = express.Router();

/*
    http://localhost:3000/client
    Retrieves an array of client from database
*/

clientRouter.get('', (request, response, next) => {
    clientService.getAllClients().then(client => {
        response.set('contnet-type', 'application/json');
        response.json(client);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/client/1
    Retrieves a single person from the database by id
    If the client does not exist, sends 404
*/

clientRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    clientService.getClientById(id).then(client => {
        if(!client) {
            response.sendStatus(404);
        }else {
            response.json(client);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

/*
    POST http://localhost:3000/client
    Creates a new client and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/

clientRouter.post('', (request, response, next) => {
    const client = request.body;
    clientService.saveClient(client).then(newClient => {
        response.sendStatus(201);
        response.json(newClient);
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

/* PATCH is an HTTP method that serves as partial replacement */

clientRouter.patch('', (request, response, next) => {
    const client = request.body;
    clientService.patchClient(client).then(updatedClient => {
        if(updatedClient) {
            response.json(updatedClient);
        }else {
            response.sendStatus(404);
        }
    }).catch(err => {
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});
