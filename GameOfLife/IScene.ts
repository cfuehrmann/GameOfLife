import Integers = require('Imports/Core/Int');
import Int = Integers.Int;

export interface IScene {
    width: number;
    height: number;
    setPoint(x: number, y: number, value: boolean): void;
    // getPointUnsafe(x: number, y: number): boolean;
    getPoint(x: Int, y: Int): boolean;
}


