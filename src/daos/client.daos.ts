import { db } from '../daos/db';
import { Client, ClientRow } from '../models/client';


export function getAllClients(): Promise<Client[]> {
    const sql = 'select * from people';
    
    return db.query<ClientRow>(sql, []).then(result => {
        const rows: ClientRow[] = result.rows;

        console.log(rows);

        const client: Client[] = rows.map(row => Client.from(row));
        return client;
    });
}

export function getClientById(id: number): Promise<Client> {
    const sql = 'select * from client where id = $1';

    return db.query<ClientRow>(sql, [id])
        .then(result => result.rows.map(row => Client.from(row))[0]);
}

export function saveClient(client: Client): Promise<Client> {
    const sql = `insert into client (first_name, last_name, street_address,\
                phone_number, email_address) values ($1, $2, $3, $4, $5) returning *`;

    return db.query<ClientRow>(sql, [
        client.firstName,
        client.lastName,
        client.streetAddress,
        client.phoneNumber,
        client.emailAddress
    ]).then(result => result.rows.map(row => Client.from(row))[0]);
}

export function patchClient(client: Client): Promise<Client> {
    const sql = `update client set first_name = coalesce($1, first_name), \
    last_name = coalesce($2, last_name), street_address = coalesce($3, street_address), \
    phone_number = coalesce($4, phone_number), email_address = coalesce($5, email_address) \
    where id = $6 returning *`;

    const params = [client.firstName, client.lastName, client.streetAddress,
    client.phoneNumber, client.emailAddress];

    return db.query<ClientRow>(sql, params)
        .then(result => result.rows.map(row => Client.from(row))[0]);
}

interface Exists {
    exists: boolean;
}