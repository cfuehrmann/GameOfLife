/// <reference path="IScene.ts"/>

class ArrayScene implements IScene {
    private array : Array<Array<boolean>>;

    constructor(public width: number, public height: number) {
        this.array = [];
        for (var i = 0; i < width; i++) {
            this.array.push([]);
        }
    }

    setPoint(x: number, y: number, value: boolean) {
        this.array[x][y] = value;
    }

    getPoint(x: number, y: number): boolean {
        return this.array[x][y];
    }
}

