export interface exerciseObject {
    id: string;
    name: string;
    attempts: setObject[][];
    order: number
}

export interface setObject {
    reps: number;
    weight: number;
    notes: string;
    date: number;
}

export interface lastValuesFromExercise {
    reps: number;
    weight: number;
}