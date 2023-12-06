import { clamp } from "../util/clamp";
import { Vector, vec } from "../vector";
import { Circle } from "./circle";
import { Collider } from "./collider";

export class Aabb implements Collider {

    constructor(public center: Vector, public size: Vector) { }

    collidesPoint(point: Vector): boolean {
        const relPos = point.sub(this.center)
        return Math.abs(relPos.x) <= this.size.x && Math.abs(relPos.y) <= this.size.y
    }

    intersects(other: Collider): boolean {
        if (other instanceof Aabb) {
            const xIntersect = this.center.x + this.size.x * 0.5 >= other.center.x - other.size.x * 0.5 &&
                this.center.x - this.size.x * 0.5 < other.center.x + other.size.x * 0.5
            const yIntersect = this.center.y + this.size.y * 0.5 >= other.center.y - other.size.y * 0.5 &&
                this.center.y - this.size.y * 0.5 < other.center.y + other.size.y * 0.5
            return xIntersect && yIntersect
        }
        if (other instanceof Circle) {
            // https://gamedev.stackexchange.com/a/178154
            const dist = other.center.sub(this.center)
            const clamped = vec(
                clamp(dist.x, -this.size.x * 0.5, this.size.x * 0.5),
                clamp(dist.y, -this.size.y * 0.5, this.size.y * 0.5),
            )
            const closest = this.center.add(clamped)
            return closest.distance(other.center) <= other.radius
        }

        // allows to implement collisions with custom colliders
        // beware of infinite recursion!
        return other.intersects(this)
    }

    translate(pos: Vector): Collider {
        return new Aabb(this.center.add(pos), this.size)
    }

    scale(pos: Vector): Collider {
        return new Aabb(this.center, this.size.scale(pos))
    }

}
