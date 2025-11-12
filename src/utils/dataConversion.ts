import type { DocumentData } from "firebase/firestore";
import type { SetObject, Dictionary } from "../interfaces.ts";

export const firestoreMapAttemptsToArrayAttempts = (
    attempts: DocumentData[string],
): SetObject[][] => {
    const thisExerciseAttempts: SetObject[][] = [];
    attempts.forEach(
        (attempt: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const sets = Object.values(attempt) as SetObject[];
            thisExerciseAttempts.push(sets);
        },
    );
    return thisExerciseAttempts;
};

export const arrayAttemptsToFirestoreMapAttempts = (attempts: SetObject[][]): DocumentData[string] => {
    const attemptArray: Dictionary[] = [];

    attempts.forEach((attempt: SetObject[]) => {
        const myObject: Dictionary = {};

        attempt.forEach((value, index) => {
            const indexString = index.toString();
            myObject[indexString] = value;
        });
        attemptArray.push(myObject);
    });
    return attemptArray;
};