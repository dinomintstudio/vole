import {isBrowser} from 'src/util/runtime'

export interface FrameInfo {
    lastFrameMillis: number
    frameRequestMillis?: number
}

export class Engine {

    isRunning: boolean = false
    frameInfo?: FrameInfo
    fps = 60
    delta = 1000 / this.fps

    private requestId?: number | ReturnType<typeof setTimeout>

    start(): void {
        if (this.isRunning) return
        this.isRunning = true

        const gameLoop = (time?: number) => {
            if (!this.isRunning) return
            if (time !== undefined) {
                this.frameInfo = {lastFrameMillis: time}
                this.update()
                this.frameInfo.frameRequestMillis = performance.now()
            }
            this.requestId = this.requestFrame(gameLoop)
        }

        gameLoop()
    }

    stop(): void {
        this.isRunning = false
    }

    update() {
        console.debug(this.frameInfo)
    }

    private requestFrame(gameLoop: (time: number) => void): number | ReturnType<typeof setTimeout> {
        if (isBrowser) {
            return window.requestAnimationFrame(gameLoop)
        } else {
            let now = performance.now()
            if (this.frameInfo?.lastFrameMillis) {
                const toWait = now - (this.frameInfo.lastFrameMillis + this.delta)
                console.debug({toWait})
                return setInterval(() => gameLoop(now), toWait)
            } else {
                return setInterval(() => gameLoop(now))
            }
        }
    }

}
