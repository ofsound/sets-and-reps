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

export const unitFromMeasurement = (measurement: string): string => {
    return measurement.replace(/[0-9]/g, "");
}

export const numberFromMeasurement = (measurement: string): number => {
    return parseInt(measurement.replace(/\D/g, ""));
}

export const isMeasurementAnInteger = (measurement: string): boolean => {
    const num = +measurement;
    return measurement.length > 0 && Number.isFinite(num) && Number.isInteger(num);
}


export const findAndDeleteSet = (arr2D: SetObject[][], objectToRemove: SetObject) => {
    for (let i = 0; i < arr2D.length; i++) {




        const innerArray = arr2D[i];
        const indexInInner = innerArray.findIndex(obj => {
            // Customize this comparison based on your object's properties
            // For example, if objects have an 'id' property:
            console.log(objectToRemove);
            console.log(obj);

            return obj === objectToRemove
        });

        if (indexInInner !== -1) {
            // Object found, remove it using splice
            innerArray.splice(indexInInner, 1);
            return true; // Indicate that the object was found and removed
        }
    }
    return false; // Indicate that the object was not found
}