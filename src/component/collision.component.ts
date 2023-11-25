import { Component } from './component'
import { Entity } from '../entity'
import { Collider } from '../collision'

export class CollisionComponent extends Component {

    collider: Collider

    constructor(entity: Entity, collider: Collider) {
        super(entity)
        this.collider = collider
    }

}
