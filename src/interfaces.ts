export interface ExerciseObject {
    id: string;
    name: string;
    attempts: SetObject[][];
    order: number
}

export interface SetObject {
    reps: number;
    weight: number;
    notes: string;
    date: number;
}

export interface LastValuesFromExercise {
    reps: number;
    weight: number;
}

export interface Dictionary {
    [key: string]: SetObject;
}
