import Integers = require('./../Imports/Core/Integers');
import Int = Integers.Int;

export interface Scene {
    width: number;
    height: number;
    setPoint(x: number, y: number, value: boolean): void;
    // getPointUnsafe(x: number, y: number): boolean;
    getPoint(x: Int, y: Int): boolean;
}


