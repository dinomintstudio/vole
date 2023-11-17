import { Vector } from './vector'

export class Camera {

    pos: Vector
    zoom: number

    constructor(pos: Vector, zoom: number) {
        this.pos = pos
        this.zoom = zoom
    }

    static defalut(): Camera {
        return new Camera(Vector.Zero, 1)
    }

}
