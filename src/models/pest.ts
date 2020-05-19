export class Pest {
    id: number;
    name: string;

    static from(obj: PestRow): Pest {
        const pest = new Pest(obj.id, obj.name);
        return pest;
    }

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export interface PestRow {
    id: number;
    name: string;
}