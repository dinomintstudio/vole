import {Component} from './component'
import {Entity} from '../entity'

export class IdComponent extends Component {

    id: number

    constructor(entity: Entity, id: number) {
        super(entity)
        this.id = id
    }

}
