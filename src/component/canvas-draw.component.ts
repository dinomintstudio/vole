import { Entity } from '../entity'
import { Component } from './component'

export class CanvasDrawComponent extends Component {

    draw: (ctx: CanvasRenderingContext2D) => boolean
    visible: boolean

    constructor(
        public entity: Entity,
        draw: (ctx: CanvasRenderingContext2D) => boolean,
        visible: boolean = true,
    ) {
        super(entity)
        this.draw = draw
        this.visible = visible
    }

}

