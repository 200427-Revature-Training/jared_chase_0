import { Exterminator } from '../models/exterminator';
import * as exterminatorDao from '../daos/exterminator.daos';

export function getAllExterminators(): Promise<Exterminator[]> {
    return exterminatorDao.getAllExterminators();
}

export function getExterminatorById(id: number): Promise<Exterminator> {
    return exterminatorDao.getExterminatorById(id);
}

export function saveExterminator(exterminator: any): Promise<Exterminator> {
    const newExterminator = new Exterminator(
        undefined, exterminator.firstName, exterminator.lastName, 
        exterminator.phoneNumber, exterminator.emailAddress
    );

    if(exterminator.firstName && exterminator.lastName && 
        exterminator.phoneNumber && exterminator.emailAddress) {
            return exterminatorDao.saveExterminator(newExterminator);
        }else {
            return new Promise((resolve, reject) => reject(422));
        };
};

export function patchExterminator(input: any): Promise<Exterminator> {
    const exterminator = new Exterminator(input.id, input.firstName, 
        input.lastName, input.phoneNumber, input.emailAddress);

    if(!exterminator.id) {
        throw new Error('400');
    }

    return exterminatorDao.patchExterminator(exterminator);
}