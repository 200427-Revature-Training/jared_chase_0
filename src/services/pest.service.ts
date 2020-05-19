import { Pest } from '../models/pest';
import * as pestDao from '../daos/pest.daos';

export function getAllPests(): Promise<Pest[]> {
    return pestDao.getAllPests();
}

export function getPestById(id: number): Promise<Pest> {
    return pestDao.getPestById(id);
}

export function savePest(pest: any): Promise<Pest> {
    const newPest = new Pest(undefined, pest.name);

    if(pest.name) {
        return pestDao.savePest(newPest);
    }else {
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchPest(input: any): Promise<Pest> {
    const pest = new Pest(input.id, input.name);

    if(!pest.id) {
        throw new Error('400');
    }

    return pestDao.patchPest(pest);
}