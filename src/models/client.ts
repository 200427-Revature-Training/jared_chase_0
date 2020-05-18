export class Client {
    id: number;
    firstName: string;
    lastName: string;
    streetAddress: string;
    phoneNumber: string;
    emailAddress: string;

    static from(obj: ClientRow): Client {
        const client = new Client(
            obj.id, obj.first_name, obj.last_name, obj.street_address, obj.phone_number, obj.email_address
        );
        return client;
    }

    constructor(id: number, firstName: string, lastName: string, streetAddress: string, phoneNumber: string, emailAddress: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
    }
}

export interface ClientRow {
    id: number;
    first_name: string;
    last_name: string;
    street_address: string;
    phone_number: string;
    email_address: string;
}