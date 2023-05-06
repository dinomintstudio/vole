import {EventDispatcher} from './event-dispatcher'
import {Eventable} from './eventable'

export type EngineEvent = 'before-update' | 'after-update'

export class EngineEventDispatcher implements Eventable<any> {
    private dispatcher = new EventDispatcher<any>()

    emit(eventName: 'before-update', delta: number): void
    emit(eventName: 'after-update', delta: number): void
    emit(eventName: string, event: any): void {
        this.dispatcher.emit(eventName, event)
    }

    off(eventName: 'before-update', handler?: (delta: number) => void): void
    off(eventName: 'after-update', handler?: (delta: number) => void): void
    off(eventName: string, handler?: (event: any) => void): void {
        this.dispatcher.off(eventName, handler)
    }

    on(eventName: 'before-update', handler: (delta: number) => void): void
    on(eventName: 'after-update', handler: (delta: number) => void): void
    on(eventName: string, handler: (event: any) => void): void {
        this.dispatcher.on(eventName, handler)
    }

    once(eventName: 'before-update', handler: (delta: any) => void): void
    once(eventName: 'after-update', handler: (delta: any) => void): void
    once(eventName: string, handler: (event: any) => void): void {
        this.dispatcher.once(eventName, handler)
    }

}
