import { Vector } from "../vector";
import { Collider } from "./collider";

export class Aabb implements Collider {

    constructor(public center: Vector, public size: Vector) { }

    collidesPoint(point: Vector): boolean {
        const relPos = point.sub(this.center)
        return Math.abs(relPos.x) <= this.size.x && Math.abs(relPos.y) <= this.size.y
    }
}
