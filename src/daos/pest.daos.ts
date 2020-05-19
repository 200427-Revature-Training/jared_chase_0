import { db } from '../daos/db';
import { Pest, PestRow } from '../models/pest';


export function getAllPests(): Promise<Pest[]> {
    const sql = 'select * from pest';

    return db.query<PestRow>(sql, []).then(result => {
        const rows: PestRow[] = result.rows;

        console.log(rows);

        const pest: Pest[] = rows.map(row => Pest.from(row));
        return pest;
    });
}

export function getPestById(id: number): Promise<Pest> {
    const sql = 'select * from pest where id = $1';

    return db.query<PestRow>(sql, [id])
        .then(result => result.rows.map(row => Pest.from(row))[0]);
}

export function savePest(pest: Pest): Promise<Pest> {
    const sql = 'insert into pest (pest_type) values ($1) returning *';

    return db.query<PestRow>(sql, [pest.pestType])
        .then(result => result.rows.map(row => Pest.from(row))[0]);
}

export function patchPest(pest: Pest): Promise<Pest> {
    const sql = 'update pest set name = coalesce($1, name) where id = $2 returning *';

    const params = [pest.pestType];

    return db.query<PestRow>(sql, params)
        .then(result => result.rows.map(row => Pest.from(row))[0]);
}