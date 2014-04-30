interface IScene {
    width: number;
    height: number;
    setPoint(x: number, y: number, value : boolean) : void;
    getPoint(x: number, y: number): boolean;
    getPoint2(x: Int, y: Int): boolean;
}


