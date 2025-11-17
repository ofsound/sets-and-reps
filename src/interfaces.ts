export interface ExerciseObject {
    id: string;
    name: string;
    attempts: SetObject[][];
    order: number;
    isCurrent: boolean
}

export interface SetObject {
    reps: number;
    measurement: string;
    notes: string;
    date: number;
}

export interface Dictionary {
    [key: string]: SetObject;
}
