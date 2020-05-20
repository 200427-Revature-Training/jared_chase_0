export class Appointment {
    id: number;
    clientId: number;
    pestId: number;
    exterminatorId: number;
    scheduledTime: Date;

    static from(obj: AppointmentRow): Appointment {
        const appointment = new Appointment(
            obj.id, obj.client_id, obj.pest_id, obj.exterminator_id, new Date(obj.scheduled_time)
        );
        return appointment;
    }

    constructor(id: number, clientId: number, pestId: number, exterminatorId: number, scheduledTime: Date) {
        this.id = id;
        this.clientId = clientId;
        this.pestId = pestId;
        this.exterminatorId = exterminatorId;
        this.scheduledTime = scheduledTime;
    }
}

export interface AppointmentRow {
    id: number;
    client_id: number;
    pest_id: number;
    exterminator_id: number;
    scheduled_time: string;
}