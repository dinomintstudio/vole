import { Entity } from '../entity'
import { Component } from './component'

export class CanvasDrawComponent extends Component {

    draw: (ctx: CanvasRenderingContext2D) => boolean

    constructor(entity: Entity, draw: (ctx: CanvasRenderingContext2D) => boolean) {
        super(entity)
        this.draw = draw
    }
}

