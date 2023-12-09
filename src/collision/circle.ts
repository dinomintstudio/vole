import { Vector } from "../vector";
import { Collider } from "./collider";

export class Circle implements Collider {

    constructor(public pos: Vector, public radius: number) { }

    collidesPoint(point: Vector): boolean {
        return this.pos.distance(point) <= this.radius
    }

    intersects(other: Collider): boolean {
        if (other instanceof Circle) {
            return this.pos.distance(other.pos) <= this.radius + other.radius
        }

        // allows to implement collisions with custom colliders
        // beware of infinite recursion!
        return other.intersects(this)
    }

    translate(pos: Vector): Collider {
        return new Circle(this.pos.add(pos), this.radius)
    }

    scale(pos: Vector): Collider {
        return new Circle(this.pos, this.radius * pos.x)
    }

}
