import {describe, expect, it} from '@jest/globals'
import {EventDispatcher} from './event-dispatcher'

describe('event dispatcher test', () => {

    it('should emit and receive void event', () => {
        const dispatcher = new EventDispatcher<void>()
        let fired = 0
        dispatcher.on('a', () => fired++)
        dispatcher.emit('a')
        expect(fired).toEqual(1)
    })

    it('should emit and receive event with value', () => {
        const dispatcher = new EventDispatcher<string>()
        let value: string | undefined
        dispatcher.on('a', v => value = v)
        dispatcher.emit('a', 'foo')
        expect(value).toEqual('foo')
    })

    it('should emit and receive event at all listeners', () => {
        const dispatcher = new EventDispatcher<void>()
        let fired = 0
        dispatcher.on('a', () => fired++)
        dispatcher.on('a', () => fired++)
        dispatcher.emit('a')
        expect(fired).toEqual(2)
    })

})
