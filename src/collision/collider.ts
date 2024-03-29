import { Vector } from "../vector";

export interface Collider {
    pos: Vector
    collidesPoint(point: Vector): boolean
    intersects(other: Collider): boolean
    translate(pos: Vector): Collider
    scale(factor: Vector): Collider
}
