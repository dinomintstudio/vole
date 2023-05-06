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

export class EventDispatcher<T> implements Eventable<T> {

    private handlers: { [key: string]: { (event: T): void }[] } = {}
    private wiredEventDispatchers: Eventable<T>[] = []
    private deferredHandlerRemovals: { name: string, handler?: (...args: any[]) => any }[] = []

    /**
     * Clears any existing handlers or wired event dispatchers on this event dispatcher
     */
    public clear() {
        this.handlers = {}
        this.wiredEventDispatchers = []
    }

    /**
     * Emits an event for target
     * @param eventName  The name of the event to publish
     * @param event      Optionally pass an event data object to the handler
     */
    public emit(eventName: string, event: T) {
        this.processDeferredHandlerRemovals()
        eventName = eventName.toLowerCase()
        let i: number
        let len: number

        const handler = this.handlers[eventName]
        if (handler) {
            i = 0
            len = handler.length
            for (i; i < len; i++) {
                handler[i](event)
            }
        }

        i = 0
        len = this.wiredEventDispatchers.length

        for (i; i < len; i++) {
            this.wiredEventDispatchers[i].emit(eventName, event)
        }
    }

    /**
     * Subscribe an event handler to a particular event name, multiple handlers per event name are allowed.
     * @param eventName  The name of the event to subscribe to
     * @param handler    The handler callback to fire on this event
     */
    public on(eventName: string, handler: (event: T) => void) {
        this.processDeferredHandlerRemovals()
        eventName = eventName.toLowerCase()

        if (!this.handlers[eventName]) {
            this.handlers[eventName] = []
        }
        this.handlers[eventName].push(handler)
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
        this.deferredHandlerRemovals.push({name: eventName, handler})
    }

    /**
     * Once listens to an event one time, then unsubscribes from that event
     *
     * @param eventName The name of the event to subscribe to once
     * @param handler   The handler of the event that will be auto unsubscribed
     */
    public once(eventName: string, handler: (event: T) => void) {
        this.processDeferredHandlerRemovals()
        const metaHandler = (event: T) => {
            this.off(eventName, metaHandler)
            handler(event)
        }

        this.on(eventName, metaHandler)
    }

    private processDeferredHandlerRemovals() {
        for (const eventHandler of this.deferredHandlerRemovals) {
            this.removeHandler(eventHandler.name, eventHandler.handler)
        }
        this.deferredHandlerRemovals.length = 0
    }

    private removeHandler(eventName: string, handler?: (event: T) => void) {
        eventName = eventName.toLowerCase()
        const eventHandlers = this.handlers[eventName]

        if (eventHandlers) {
            // if no explicit handler is give with the event name clear all handlers
            if (!handler) {
                this.handlers[eventName].length = 0
            } else {
                const index = eventHandlers.indexOf(handler)
                if (index > -1) {
                    this.handlers[eventName].splice(index, 1)
                }
            }
        }
    }
}
