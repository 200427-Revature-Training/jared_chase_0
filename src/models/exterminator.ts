export class Exterminator {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;

    static from(obj: ExterminatorRow): Exterminator {
        const exterminator = new Exterminator(
            obj.id, obj.first_name, obj.last_name, obj.phone_number, obj.email_address
        );
        return exterminator;
    }

    constructor(id: number, firstName: string, lastName: string, phoneNumber: string, emailAddress: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
    }
}

export interface ExterminatorRow {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email_address: string;
}