import express from 'express';
import * as exterminatorService from '../services/exterminator.service';

export const exterminatorRouter = express.Router();

/*
    http://localhost:3000/exterminator
    Retrieves an array of exterminator from database
*/

exterminatorRouter.get('', (request, response, next) => {
    exterminatorService.getAllExterminators().then(exterminator => {
        response.set('content-type', 'application/json');
        response.json(exterminator);
        next();
    });
});

/*
    http://localhost:3000/exterminator/1
    Retrieves a single exterminator from the database by id
    If the exterminator does not exist, sends 404
*/

exterminatorRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    exterminatorService.getExterminatorById(id).then(exterminator => {
        if(!exterminator) {
            response.sendStatus(404);
        }else {
            response.json(exterminator);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

/*
    POST http://localhost:3000/exterminator
    Creates a new exterminator and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/

exterminatorRouter.post('', (request, response, next) => {
    const exterminator = request.body;
    exterminatorService.saveExterminator(exterminator).then(newExterminator => {
        response.sendStatus(201);
        response.json(newExterminator);
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

/* PATCH is an HTTP method that serves as partial replacement */
exterminatorRouter.patch('', (request, response, next) => {
    const exterminator = request.body;
    exterminatorService.patchExterminator(exterminator).then(updatedExterminator => {
        if(updatedExterminator) {
            response.json(updatedExterminator);
        }else {
            response.sendStatus(404);
        }
    }).catch(err => {
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});