
import Grid from './Grid'

import {keys} from 'lodash'
import GridData from 'Game/Data/Grid'


describe('Game/Type/Grid', () => {
    it('should be defined', () => {
        expect(Grid).toBeDefined();
    })
    describe('getData', () => {
        it('should return an object', () => {
            let key = GridData.keys[0]
            let val = GridData.get(key)
            let grid = new Grid({type: key})
            expect(grid.getData()).toBe(val);
        })
    })
})