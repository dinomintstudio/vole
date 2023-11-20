import { Vector } from "../vector";
import { Collider } from "./collider";

export class Group implements Collider {

    constructor(public colliders: Collider[]) { }

    collidesPoint(point: Vector): boolean {
        return this.colliders.some(c => c.collidesPoint(point))
    }

    intersects(other: Collider): boolean {
        return this.colliders.some(c => c.intersects(other))
    }

}
