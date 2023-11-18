import { Vector } from "../vector";
import { Collider } from "./collider";

export class Circle implements Collider {

    constructor(public pos: Vector, public radius: number) { }

    collidesPoint(point: Vector): boolean {
        return this.pos.distance(point) <= this.radius
    }
}
