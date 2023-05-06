import {isBrowser} from './util/runtime'
import {EngineEventDispatcher} from './engine-event-dispatcher'
import {Scene} from './scene'

export interface FrameInfo {
    id: number
    lastFrameMillis: number
    lastFrameDelta: number
    frameRequestMillis: number
}

export interface PerformanceInfo {
    updateDelta: number
    frameDelta: number
    idleDelta: number
    fps: number
    fpsPotential: number
}

export class Engine {

    fps = 60
    delta = 1000 / this.fps

    isRunning: boolean = false
    frameInfo: FrameInfo = {id: 0, lastFrameMillis: 0, lastFrameDelta: 0, frameRequestMillis: 0}
    performanceInfo: PerformanceInfo = {updateDelta: 0, frameDelta: 0, idleDelta: 0, fps: 0, fpsPotential: 0}
    eventDispatcher: EngineEventDispatcher = new EngineEventDispatcher()

    uid = 0
    frameCount = 0
    requestId?: number | ReturnType<typeof setTimeout>

    activeScene?: Scene
    private sceneMap: Map<string, Scene> = new Map<string, Scene>()

    start(): void {
        if (this.isRunning) return
        this.isRunning = true

        const gameLoop = (frameFireTime: number) => {
            if (!this.isRunning) return
            this.requestId = this.requestFrame(gameLoop)

            const delta = frameFireTime - (this.frameInfo?.lastFrameMillis ?? 0)
            this.frameInfo.id = ++this.frameCount
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
            this.performanceInfo.fps = 1000 / delta
            this.performanceInfo.fpsPotential = 1000 / this.performanceInfo.updateDelta
            this.frameInfo.frameRequestMillis = afterUpdate
        }

        gameLoop(performance.now())
    }

    stop(): void {
        this.isRunning = false
    }

    update(delta: number): void {
        if (!this.activeScene) return
        const entities = this.activeScene.entities
        for (let i = 0; i < entities.length; i++) {
            const e = entities[i]
            if (!e.initialized) {
                e.init(this)
                e.initialized = true
            }
        }
        for (let i = 0; i < entities.length; i++) {
            entities[i].update(this, delta)
        }
    }

    addScene(scene: Scene): void {
        if (this.sceneMap.get(scene.name)) return
        scene.engine = this
        this.sceneMap.set(scene.name, scene)
        scene.init()
    }

    removeScene(sceneName: string): void {
        this.sceneMap.delete(sceneName)
    }

    goToScene(sceneName: string): void {
        const scene = this.sceneMap.get(sceneName)
        if (!scene) return
        this.activeScene = scene
    }

    private requestFrame(gameLoop: (time: number) => void): number | ReturnType<typeof setTimeout> {
        if (isBrowser) {
            return window.requestAnimationFrame(gameLoop)
        } else {
            let now = performance.now()
            if (this.frameInfo?.lastFrameMillis) {
                const error = this.delta - this.frameInfo.lastFrameDelta
                const toWait = now - (this.frameInfo.lastFrameMillis + this.delta) - error
                return setInterval(() => gameLoop(now), toWait)
            } else {
                return setInterval(() => gameLoop(now))
            }
        }
    }

}
