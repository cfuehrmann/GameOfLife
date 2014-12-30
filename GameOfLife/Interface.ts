/* tslint:disable no-unused-variable*/
import Integers = require("./Imports/Core/Integers");
import Int = Integers.Int;
/* tslint:enable no-unused-variable*/

export interface PointMap<T> {
    clear(): void;
    drawPoint(x: Int, y: Int, value: T): void;
}
