import {Entity} from '../entity'

export abstract class Component {

    entity: Entity

    constructor(entity: Entity) {
        this.entity = entity
    }

}
