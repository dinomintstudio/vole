import {foo} from 'src/engine'

describe('example test', () => {

    it('should run test suite', () => {
        expect(foo()).toEqual(42)
    })

})
