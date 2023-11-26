import { Component } from './component/component'
import { Engine } from './engine'
import { Scene } from './scene'

export type ConstructorType<T> = new (...args: any) => T

export class Entity {

    scene?: Scene
    components: Map<ConstructorType<any>, Component> = new Map<ConstructorType<any>, Component>()

    initialized = false

    init(engine: Engine): void {
    }

    update(engine: Engine, delta: number): void {
    }

    draw(engine: Engine, delta: number): void {
    }

    add<T extends Component>(component: T): void {
        this.components.set(component.constructor as ConstructorType<T>, component)
    }

    get<T extends Component>(componentType: ConstructorType<T>): T | undefined {
        return this.components.get(componentType) as T | undefined
    }

}

