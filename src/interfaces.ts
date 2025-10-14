export interface exerciseObject {
    id: string;
    name: string;
    attempts: setObject[][];
}

export interface setObject {
    reps: number;
    weight: number;
    notes: string;
    date: number;
}