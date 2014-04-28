/// <reference path="IScene.ts"/>
/// <reference path="ArgumentException.ts"/>

class ArrayScene implements IScene {
    private array: Array<Array<boolean>>;

    constructor(public width: number, public height: number) {
        if (width % 1 !== 0) {
            throw new ArgumentException("width");
        }
        if (width <= 0) {
            throw new ArgumentException("width");
        }
        this.array = [];
        for (var x = 0; x < width; x++) {
            this.array[x] = [];
            for (var y = 0; y < height; y++) {
                this.array[x][y] = false;
            }
        }
    }

    setPoint(x: number, y: number, value: boolean) {
        this.array[x][y] = value;
    }

    getPoint(x: number, y: number): boolean {
        return this.array[x][y];
    }
}

