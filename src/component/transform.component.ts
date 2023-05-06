import {Vector} from '../vector'
import {Component} from './component'
import {Entity} from '../entity'

export class TransformComponent extends Component {

    pos: Vector
    rotation: number

    private _globalPos?: Vector

    set globalPos(pos: Vector) {
        this._globalPos = pos
    }

    get globalPos() {
        return this._globalPos ?? this.pos
    }

    constructor(entity: Entity, pos: Vector, rotation: number) {
        super(entity)
        this.pos = pos
        this.rotation = rotation
    }

    static default(entity: Entity): TransformComponent {
        return new TransformComponent(entity, Vector.Zero, 0)
    }

}
