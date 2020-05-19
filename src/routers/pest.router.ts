import express from 'express';
import * as pestService from '../services/pest.service';

export const pestRouter = express.Router();

/*
    http://localhost:3000/pest
    Retrieves an array of pest from database
*/

pestRouter.get('', (request, response, next) => {
    pestService.getAllPests().then(pest => {
        response.set('content-type', 'application/json');
        response.json(pest);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/pest/1
    Retrieves a single pest from the database by id
    If the pest does not exist, sends 404
*/

pestRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    pestService.getPestById(id).then(pest => {
        if(!pest) {
            response.sendStatus(404);
        }else {
            response.json(pest);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

/*
    POST http://localhost:3000/pest
    Creates a new pest and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/

pestRouter.post('', (request, response, next) => {
    const pest = request.body;
    pestService.savePest(pest).then(newPest => {
        response.sendStatus(201);
        response.json(newPest);
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

/* PATCH is an HTTP method that serves as partial replacement */

pestRouter.patch('', (request, response, next) => {
    const pest = request.body;
    pestService.patchPest(pest).then(updatedPest => {
        if(updatedPest) {
            response.json(updatedPest);
        }else {
            response.sendStatus(404);
        }
    }).catch(err => {
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});