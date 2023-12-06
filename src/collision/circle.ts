import { Vector } from "../vector";
import { Collider } from "./collider";

export class Circle implements Collider {

    constructor(public center: Vector, public radius: number) { }

    collidesPoint(point: Vector): boolean {
        return this.center.distance(point) <= this.radius
    }

    intersects(other: Collider): boolean {
        if (other instanceof Circle) {
            return this.center.distance(other.center) <= Math.max(this.radius, other.radius)
        }

        // allows to implement collisions with custom colliders
        // beware of infinite recursion!
        return other.intersects(this)
    }

    translate(pos: Vector): Collider {
        return new Circle(this.center.add(pos), this.radius)
    }

    scale(pos: Vector): Collider {
        return new Circle(this.center, this.radius * pos.x)
    }

}
