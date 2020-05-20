import { db } from './db';
import { Appointment, AppointmentRow } from '../models/appointment';


export function getAllAppointments(): Promise<Appointment[]> {
    const sql = 'select * from appointment';

    return db.query<AppointmentRow>(sql, []).then(result => {
        const rows: AppointmentRow[] = result.rows;
        
        console.log(rows);

        const appointment: Appointment[] = rows.map(row => Appointment.from(row));
        return appointment;
    });
}

export function getAppointmentById(id: number): Promise<Appointment> {
    const sql = 'select * from appointment where id = $1';

    return db.query<AppointmentRow>(sql, [id])
        .then(result => result.rows.map(row => Appointment.from(row))[0]);
}

export function saveAppointment(appointment: Appointment): Promise<Appointment> {
    const sql = 'insert into appointment (client_id, pest_id, exterminator_id, \
        scheduled_time) values ($1, $2, $3, $4) returning *';

    return db.query<AppointmentRow>(sql, [
        appointment.clientId, appointment.pestId, appointment.exterminatorId, 
        appointment.scheduledTime.toLocaleString()
    ]).then(result => result.rows.map(row => Appointment.from(row))[0]);
}

export function patchAppointment(appointment: Appointment): Promise<Appointment> {
    const sql = `update appointment set client_id = coalesce($1, client_id), pest_id \
    = coalesce($2, pest_id), exterminator_id = coalesce($3, exterminator_id), \
    scheduled_time = coalesce($4, scheduled_time) where id = $5 returning *`;

    const scheduledTime = appointment.scheduledTime && appointment.scheduledTime.toLocaleString();
    
    const params = [appointment.clientId, appointment.pestId, 
        appointment.exterminatorId, scheduledTime];

    return db.query<AppointmentRow>(sql, params)
        .then(result => result.rows.map(row => Appointment.from(row))[0]);
}