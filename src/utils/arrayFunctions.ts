import type { SetObject } from "../interfaces.ts";

export const deleteSetFromAttempts = (arr2D: SetObject[][], objectToRemove: SetObject) => {
    for (let i = 0; i < arr2D.length; i++) {
        const innerArray = arr2D[i];
        const indexInInner = innerArray.findIndex(obj => {
            return obj === objectToRemove
        });

        if (indexInInner !== -1) {
            innerArray.splice(indexInInner, 1);
            return true;
        }
    }
    return false;
}