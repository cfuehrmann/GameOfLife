import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;

export interface Scene {
    getWidth(): Int;
    getHeight(): Int;
    setPoint(x: Int, y: Int, value: boolean): void;
    getPoint(x: Int, y: Int): boolean;
}


