import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;

export interface Scene {
    width: Int;
    height: Int;
    setPoint(x: Int, y: Int, value: boolean): void;
    // getPointUnsafe(x: number, y: number): boolean;
    getPoint(x: Int, y: Int): boolean;
}


