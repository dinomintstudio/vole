import {beforeAll, describe, expect, it, jest} from '@jest/globals'
import {Engine} from './engine'

describe('engine test', () => {

    beforeAll(() => {
        jest.useFakeTimers()
    })

    it('should run game loop', done => {
        let count = 0
        const engine = new class extends Engine {
            update(delta: number) {
                super.update(delta)
                count++
            }
        }
        engine.start()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        engine.stop()
        expect(count).toEqual(2)
        done()
    })

})
