import { clamp } from "../util/clamp";
import { Vector, vec } from "../vector";
import { Circle } from "./circle";
import { Collider } from "./collider";

export class Aabb implements Collider {

    constructor(public pos: Vector, public size: Vector) { }

    collidesPoint(point: Vector): boolean {
        const relPos = point.sub(this.pos)
        return Math.abs(relPos.x) <= this.size.x && Math.abs(relPos.y) <= this.size.y
    }

    intersects(other: Collider): boolean {
        if (other instanceof Aabb) {
            const xIntersect = this.pos.x + this.size.x * 0.5 >= other.pos.x - other.size.x * 0.5 &&
                this.pos.x - this.size.x * 0.5 < other.pos.x + other.size.x * 0.5
            const yIntersect = this.pos.y + this.size.y * 0.5 >= other.pos.y - other.size.y * 0.5 &&
                this.pos.y - this.size.y * 0.5 < other.pos.y + other.size.y * 0.5
            return xIntersect && yIntersect
        }
        if (other instanceof Circle) {
            // https://gamedev.stackexchange.com/a/178154
            const dist = other.pos.sub(this.pos)
            const clamped = vec(
                clamp(dist.x, -this.size.x * 0.5, this.size.x * 0.5),
                clamp(dist.y, -this.size.y * 0.5, this.size.y * 0.5),
            )
            const closest = this.pos.add(clamped)
            return closest.distance(other.pos) <= other.radius
        }

        // allows to implement collisions with custom colliders
        // beware of infinite recursion!
        return other.intersects(this)
    }

    translate(pos: Vector): Collider {
        return new Aabb(this.pos.add(pos), this.size)
    }

    scale(pos: Vector): Collider {
        return new Aabb(this.pos, this.size.scale(pos))
    }

}
