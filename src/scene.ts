import { Engine } from './engine'
import { Camera } from './camera'
import { Entity } from './entity'
import { IdComponent } from './component'

export class Scene {

    engine?: Engine
    name: string
    entities: Entity[] = []
    camera?: Camera

    constructor(name: string) {
        this.name = name
    }

    /**
     * Called by the engine once it's initialized
     */
    init(): void {
    }

    /**
     * Called by the engine once right after it's set as active
     */
    activated(): void {
    }

    /**
     * Called by the engine once right after engine goes to another scene
     */
    deactivated(): void {
    }

    add(entity: Entity): void {
        if (entity.get(IdComponent)) return

        entity.add(new IdComponent(entity, ++this.engine!.uid))
        entity.scene = this
        this.entities.push(entity)
    }

    remove(id: number): void {
        this.entities = this.entities.filter(e => e.get(IdComponent)?.id !== id)
    }

}
