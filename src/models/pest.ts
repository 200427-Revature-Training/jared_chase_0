export class Pest {
    id: number;
    pestType: string;

    static from(obj: PestRow): Pest {
        const pest = new Pest(obj.id, obj.pest_type);
        return pest;
    }

    constructor(id: number, pestType: string) {
        this.id = id;
        this.pestType = pestType;
    }
}

export interface PestRow {
    id: number;
    pest_type: string;
}