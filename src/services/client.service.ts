import { Client } from '../models/client';
import * as clientDao from '../daos/client.daos';


export function getAllClients(): Promise<Client[]> {
    return clientDao.getAllClients();
}

export function getClientById(id: number): Promise<Client> {
    return clientDao.getClientById(id);
}

export function saveClient(client: any): Promise<Client> {
    const newClient = new Client(
        undefined, client.firstName, client.lastName, 
        client.streetAddress, client.phoneNumber, client.emailAddress
    );

    if (client.firstName && client.lastName && client.streetAddress && client.phoneNumber && client.emailAddress) {
        return clientDao.saveClient(newClient);
    }else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchClient(input: any): Promise<Client> {
    const client = new Client(input.id, input.firstName, input.lastName, input.streetAddress, input.phoneNumber, input.emailAddress);

    if (!client.id) {
        throw new Error('400');
    }

    return clientDao.patchClient(client);
}