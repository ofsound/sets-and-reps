export interface ExerciseObject {
    id: string;
    name: string;
    attempts: SetObject[][];
    order: number
}

export interface SetObject {
    reps: number;
    unit: string;
    notes: string;
    date: number;
}

export interface Dictionary {
    [key: string]: SetObject;
}
