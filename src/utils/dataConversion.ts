import type { DocumentData } from "firebase/firestore";
import type { SetObject, Dictionary } from "../interfaces.ts";

export const firestoreMapAttemptsToArrayAttempts = (
    attempts: DocumentData[string],
): SetObject[][] => {
    const arrayAttempts: SetObject[][] = [];
    attempts.forEach(
        (attempt: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const sets = Object.values(attempt) as SetObject[];
            arrayAttempts.push(sets);
        },
    );
    return arrayAttempts;
};

export const arrayAttemptsToFirestoreMapAttempts = (attempts: SetObject[][]): DocumentData[string] => {
    const firestoreMapAttempts: Dictionary[] = [];

    attempts.forEach((attempt: SetObject[]) => {
        const myObject: Dictionary = {};

        attempt.forEach((value, index) => {
            const indexString = index.toString();
            myObject[indexString] = value;
        });
        firestoreMapAttempts.push(myObject);
    });
    return firestoreMapAttempts;
};

export const unitTypeFromUnit = (unit: string): string => {
    return unit.replace(/[0-9]/g, "");
}

export const unitNumericValueFromUnit = (unit: string): number => {
    return parseInt(unit.replace(/\D/g, ""));
}

export const isUnitAnInteger = (unit: string): boolean => {
    const num = +unit;
    return unit.length > 0 && Number.isFinite(num) && Number.isInteger(num);
}