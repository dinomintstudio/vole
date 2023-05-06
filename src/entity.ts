import {Component} from './component/component'
import {Engine} from './engine'

export type ConstructorType<T> = new (...args: any) => T

export class Entity {

    components: Map<ConstructorType<any>, Component> = new Map<ConstructorType<any>, Component>()

    constructor() {
    }

    initialized = false

    init(engine: Engine): void {
    }

    update(engine: Engine, delta: number): void {
    }

    add<T extends Component>(component: T): void {
        this.components.set(component.constructor as ConstructorType<T>, component)
    }

    get<T extends Component>(componentType: ConstructorType<T>): T | undefined {
        return this.components.get(componentType) as T | undefined
    }

}

