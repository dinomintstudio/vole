import {isBrowser} from './util/runtime'
import {EngineEventDispatcher} from './engine-event-dispatcher'

export interface FrameInfo {
    lastFrameMillis: number
    lastFrameDelta: number
    frameRequestMillis: number
}

export interface Performance {
    updateDelta: number
    frameDelta: number
    idleDelta: number
}

export interface Entity {
    id?: number

    update(delta: number): void
}

export class Engine {

    fps = 60
    delta = 1000 / this.fps

    isRunning: boolean = false
    frameInfo: FrameInfo = {lastFrameMillis: 0, lastFrameDelta: 0, frameRequestMillis: 0}
    performanceInfo: Performance = {updateDelta: 0, frameDelta: 0, idleDelta: 0}
    entities: Entity[] = []
    eventDispatcher: EngineEventDispatcher = new EngineEventDispatcher()

    private uid = 0
    private requestId?: number | ReturnType<typeof setTimeout>

    start(): void {
        if (this.isRunning) return
        this.isRunning = true

        const gameLoop = (frameFireTime: number) => {
            if (!this.isRunning) return
            this.requestId = this.requestFrame(gameLoop)

            const delta = frameFireTime - (this.frameInfo?.lastFrameMillis || 0)
            this.frameInfo.lastFrameMillis = frameFireTime
            this.frameInfo.lastFrameDelta = delta

            this.eventDispatcher.emit('before-update', delta)
            const beforeUpdate = performance.now()
            this.update(delta)
            const afterUpdate = performance.now()
            this.eventDispatcher.emit('after-update', delta)

            this.performanceInfo.frameDelta = delta
            this.performanceInfo.updateDelta = afterUpdate - beforeUpdate
            this.performanceInfo.idleDelta = this.performanceInfo.frameDelta - this.performanceInfo.updateDelta
            console.debug(this.frameInfo, this.performanceInfo)
            this.frameInfo.frameRequestMillis = afterUpdate
        }

        gameLoop(performance.now())
    }

    stop(): void {
        this.isRunning = false
    }

    update(delta: number) {
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(delta)
        }
    }

    add(entity: Entity): Entity {
        if (entity.id) return entity

        entity.id = ++this.uid
        this.entities.push(entity)
        return entity
    }

    remove(id: number): void {
        this.entities = this.entities.filter(e => e.id !== id)
    }

    private requestFrame(gameLoop: (time: number) => void): number | ReturnType<typeof setTimeout> {
        if (isBrowser) {
            return window.requestAnimationFrame(gameLoop)
        } else {
            let now = performance.now()
            if (this.frameInfo?.lastFrameMillis) {
                const error = this.delta - this.frameInfo.lastFrameDelta
                console.log({error})
                const toWait = now - (this.frameInfo.lastFrameMillis + this.delta) - error
                console.debug({toWait})
                return setInterval(() => gameLoop(now), toWait)
            } else {
                return setInterval(() => gameLoop(now))
            }
        }
    }

}
