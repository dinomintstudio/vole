/**
 * BSD 2-Clause License
 *
 * Copyright (c) 2013, Erik Onarheim
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import {Eventable} from './eventable'

export class EventDispatcher<T = any> implements Eventable<T> {
    private _handlers: { [key: string]: { (event: T): void }[] } = {}
    private _wiredEventDispatchers: Eventable<T>[] = []

    /**
     * Clears any existing handlers or wired event dispatchers on this event dispatcher
     */
    public clear() {
        this._handlers = {}
        this._wiredEventDispatchers = []
    }

    private _deferedHandlerRemovals: { name: string, handler?: (...args: any[]) => any }[] = []

    private _processDeferredHandlerRemovals() {
        for (const eventHandler of this._deferedHandlerRemovals) {
            this._removeHandler(eventHandler.name, eventHandler.handler)
        }
        this._deferedHandlerRemovals.length = 0
    }

    /**
     * Emits an event for target
     * @param eventName  The name of the event to publish
     * @param event      Optionally pass an event data object to the handler
     */
    public emit(eventName: string, event: T) {
        this._processDeferredHandlerRemovals()
        if (!eventName) {
            // key not mapped
            return
        }
        eventName = eventName.toLowerCase()
        let i: number, len: number

        if (this._handlers[eventName]) {
            i = 0
            len = this._handlers[eventName].length
            for (i; i < len; i++) {
                this._handlers[eventName][i](event)
            }
        }

        i = 0
        len = this._wiredEventDispatchers.length

        for (i; i < len; i++) {
            this._wiredEventDispatchers[i].emit(eventName, event)
        }
    }

    /**
     * Subscribe an event handler to a particular event name, multiple handlers per event name are allowed.
     * @param eventName  The name of the event to subscribe to
     * @param handler    The handler callback to fire on this event
     */
    public on(eventName: string, handler: (event: T) => void) {
        this._processDeferredHandlerRemovals()
        eventName = eventName.toLowerCase()

        if (!this._handlers[eventName]) {
            this._handlers[eventName] = []
        }
        this._handlers[eventName].push(handler)
    }

    /**
     * Unsubscribe an event handler(s) from an event. If a specific handler
     * is specified for an event, only that handler will be unsubscribed.
     * Otherwise all handlers will be unsubscribed for that event.
     *
     * @param eventName  The name of the event to unsubscribe
     * @param handler    Optionally the specific handler to unsubscribe
     */
    public off(eventName: string, handler?: (event: T) => void) {
        this._deferedHandlerRemovals.push({name: eventName, handler})
    }

    private _removeHandler(eventName: string, handler?: (event: T) => void) {
        eventName = eventName.toLowerCase()
        const eventHandlers = this._handlers[eventName]

        if (eventHandlers) {
            // if no explicit handler is give with the event name clear all handlers
            if (!handler) {
                this._handlers[eventName].length = 0
            } else {
                const index = eventHandlers.indexOf(handler)
                if (index > -1) {
                    this._handlers[eventName].splice(index, 1)
                }
            }
        }
    }

    /**
     * Once listens to an event one time, then unsubscribes from that event
     *
     * @param eventName The name of the event to subscribe to once
     * @param handler   The handler of the event that will be auto unsubscribed
     */
    public once(eventName: string, handler: (event: T) => void) {
        this._processDeferredHandlerRemovals()
        const metaHandler = (event: T) => {
            this.off(eventName, metaHandler)
            handler(event)
        }

        this.on(eventName, metaHandler)
    }

    /**
     * Wires this event dispatcher to also receive events from another
     */
    public wire(eventDispatcher: EventDispatcher): void {
        eventDispatcher._wiredEventDispatchers.push(this)
    }

    /**
     * Unwires this event dispatcher from another
     */
    public unwire(eventDispatcher: EventDispatcher): void {
        const index = eventDispatcher._wiredEventDispatchers.indexOf(this)
        if (index > -1) {
            eventDispatcher._wiredEventDispatchers.splice(index, 1)
        }
    }
}
