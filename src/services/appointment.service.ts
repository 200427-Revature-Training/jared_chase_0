import { Appointment } from '../models/appointment';
import * as appointmentDao from '../daos/appointment.daos';

export function getAllAppointments(): Promise<Appointment[]> {
    return appointmentDao.getAllAppointments();
}

export function getAppointmentById(id: number): Promise<Appointment> {
    return appointmentDao.getAppointmentById(id);
}

export function saveAppointment(appointment: any): Promise<Appointment> {
    const newAppointment = new Appointment(
        undefined, appointment.clientId, appointment.pestId, 
        appointment.exterminatorId, new Date(appointment.scheduledTime)
    );

    if(appointment.clientId && appointment.pestId 
        && appointment.exterminatorId && appointment.scheduledTime) {
            return appointmentDao.saveAppointment(newAppointment);
        }else {
            return new Promise((resolve, reject) => reject(422));
        }
}

export function patchAppointment(input: any): Promise<Appointment> {
    const scheduledTime = input.scheduledTime && new Date(input.scheduledTime);

    const appointment = new Appointment(
        input.id, input.clientId, input.pestId, input.exterminatorId, scheduledTime
    );

    if(!appointment.id) {
        throw new Error('400');
    }
    return appointmentDao.patchAppointment(appointment);
}