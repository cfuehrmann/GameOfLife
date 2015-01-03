/* tslint:disable no-unused-variable*/
import Exceptions = require("./Exceptions");
import ArgumentException = Exceptions.ArgumentException;
/* tslint:enable no-unused-variable*/

export interface List<TElement> {
    map<TNewElement>(func: (element: TElement) => TNewElement): List<TNewElement>

    fold<TResult>(
        startValue: TResult,
        func: (result: TResult, element: TElement) => TResult): TResult
}

export function from<TElement>(array: TElement[]): List<TElement> {
    return new ArrayList(array);
}

class ArrayList<TElement> implements List<TElement> {

    constructor(private array: TElement[]) {
        if (typeof array === "undefined" || array == null) {
            throw new ArgumentException("array");
        }
    }

    fold<TResult>(startValue: TResult, func: (result: TResult, element: TElement) => TResult) {
        if (typeof func === "undefined" || func == null) {
            throw new ArgumentException("func");
        }
        var result = startValue;
        for (var i = 0; i < this.array.length; i++) {
            result = func(result, this.array[i]);
        }
        return result;
    }

    map<TNewElement>(func: (element: TElement) => TNewElement): List<TNewElement> {
        if (typeof func === "undefined" || func == null) {
            throw new ArgumentException("func");
        }
        var resultArray: TNewElement[] = [];
        for (var i = 0; i < this.array.length; i++) {
            resultArray.push(func(this.array[i]));
        }
        return new ArrayList(resultArray);
    }
}