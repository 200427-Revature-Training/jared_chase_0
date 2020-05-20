import express from 'express';
import * as appointmentService from '../services/appointment.service';

export const appointmentRouter = express.Router();

/*
    http://localhost:3000/appointment
    Retrieves an array of client from database
*/

appointmentRouter.get('', (request, response, next) => {
    appointmentService.getAllAppointments().then(appointment => {
        response.set('content-type', 'application/json');
        response.json(appointment);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
    http://localhost:3000/appointment/1
    Retrieves a single appointment from the database by id
    If the appointment does not exist, sends 404
*/

appointmentRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    appointmentService.getAppointmentById(id).then(appointment => {
        if(!appointment) {
            response.sendStatus(404);
        }else {
            response.json(appointment);
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

appointmentRouter.post('', (request, response, next) => {
    const appointment = request.body;
    appointmentService.saveAppointment(appointment).then(newAppointment => {
        response.sendStatus(201);
        response.json(newAppointment);
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    });
});

/* PATCH is an HTTP method that serves as partial replacement */

appointmentRouter.patch('', (request, response, next) => {
    const appointment = request.body;
    appointmentService.patchAppointment(appointment).then(updatedAppointment => {
        if(updatedAppointment) {
            response.json(updatedAppointment);
        }else {
            response.sendStatus(404);
        }
    }).catch(err => {
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});