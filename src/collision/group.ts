import { Vector } from "../vector";
import { Collider } from "./collider";

export class Group implements Collider {

    constructor(public pos: Vector, public colliders: Collider[]) { }

    collidesPoint(point: Vector): boolean {
        return this.colliders.some(c => c.translate(this.pos).collidesPoint(point))
    }

    intersects(other: Collider): boolean {
        return this.colliders.some(c => c.translate(this.pos).intersects(other))
    }

    translate(pos: Vector): Collider {
        return new Group(this.pos.add(pos), this.colliders)
    }

    scale(pos: Vector): Collider {
        return new Group(this.pos, this.colliders.map(c => c.scale(pos)))
    }

}
