import { db } from '../daos/db';
import { Exterminator, ExterminatorRow } from '../models/exterminator';


export function getAllExterminators(): Promise<Exterminator[]> {
    const sql = 'select * from exterminator';

    return db.query<ExterminatorRow>(sql, []).then(result => {
        const rows: ExterminatorRow[] = result.rows;

        console.log(rows);

        const exterminator: Exterminator[] = rows.map(row => Exterminator.from(row));
        return exterminator;
    });
}

export function getExterminatorById(id: number): Promise<Exterminator> {
    const sql = 'select * from exterminator where id = $1';

    return db.query<ExterminatorRow>(sql, [id])
        .then(result => result.rows.map(row => Exterminator.from(row))[0]);
}

export function saveExterminator(exterminator: Exterminator): Promise<Exterminator> {
    const sql = `insert into exterminator (first_name, last_name,\
                phone_number, email_address) values ($1, $2, $3, $4) returning *`;
    return db.query<ExterminatorRow>(sql, [
        exterminator.firstName,
        exterminator.lastName,
        exterminator.phoneNumber,
        exterminator.emailAddress
    ]).then(result => result.rows.map(row => Exterminator.from(row))[0]);
}

export function patchExterminator(exterminator: Exterminator): Promise<Exterminator> {
    const sql = `update exterminator set first_name = coalesce($1, first_name), \
    last_name = coalesce($2, last_name), phone_number = coalesce($3, phone_number), \
    email_address = coalesce($4, email_address) where id = $5 returning *`;

    const params = [exterminator.firstName, exterminator.lastName,
    exterminator.phoneNumber, exterminator.emailAddress];

    return db.query<ExterminatorRow>(sql, params)
        .then(result => result.rows.map(row => Exterminator.from(row))[0]);
}