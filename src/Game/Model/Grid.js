//@flow

import { keys } from 'lodash';
import { Graph, astar } from 'javascript-astar';
import Grid from 'Game/Type/Grid'
import MouseButtons from 'Util/MouseButtons';
import { makeKey, parseKey } from 'Util/index';
import GridData from 'Game/Data/Grid'

import type Point from 'Game/Point'
import Block from 'Game/Block';

import state from 'Game/state';

export type GridState = {
    [id: string]: Grid
}

export default class GridModel {
    state: GridState;
    pathCache: { grid: Array<Array<number>>, minx: number, miny: number }
    constructor(s: GridState = {}) {
        this.state = s;
    }

    addNodes(selection: Object, type: Grid) {
        let sel = selection.rect.blockRect();
        for (let y = sel.t; y <= sel.b; y++) {
            for (let x = sel.l; x <= sel.r; x++) {
                switch (selection.button) {
                    case MouseButtons.LEFT:
                        this.addNode(x, y, new Grid(type));
                        break;
                    case MouseButtons.RIGHT:
                        this.removeNode(x, y);
                        break;
                }
            }
        }
    }


    addNode(x: number, y: number, node: Grid) {
        this.state[makeKey(x, y)] = node;
    }

    removeNode(x: number, y: number) {
        delete this.state[makeKey(x, y)];
    }

    getNode(x: number, y: number): Grid {
        return this.state[makeKey(x, y)];
    }
    randomNode(): Block {
        let k = keys(this.state);
        let r = Math.floor(Math.random() * k.length);
        return new Block(parseKey(k[r]));
    }


    getPath(start: Block, end: Block): Array<Block> {

        let objectManager = state.object

        //determine graph size
        let minx: number = Infinity;
        let miny: number = Infinity;
        let maxx: number = -Infinity;
        let maxy: number = -Infinity;
        keys(this.state).forEach((key) => {
            let loc = parseKey(key);
            minx = Math.min(minx, loc.x);
            miny = Math.min(miny, loc.y);
            maxx = Math.max(maxx, loc.x);
            maxy = Math.max(maxy, loc.y);
        });

        //make the empty Graph
        let arr: Array<Array<number>> = [];
        for (let x = minx; x <= maxx; x++) {
            let arr2 = [];
            for (let y = miny; y <= maxy; y++) {
                arr2.push(0);
            }
            arr.push(arr2);
        }

        //populate graph
        keys(this.state).forEach((key) => { //duplicate?
            let loc = parseKey(key);
            let block = this.state[key]
            let type = GridData.get(block.type)


            let weight = type.weight
            // if(block.object){
            //   weight = 10
            // }
            arr[loc.x - minx][loc.y - miny] = weight;

        });
        if (objectManager) {
            objectManager.getObjects().forEach((o) => {
                o.getBlocks().forEach((b) => {
                    let targ = o.block.add(b);
                    let weight = arr[targ.x - minx][targ.y - miny]
                    //apart from zero
                    if (b.weight === 0) {
                        weight = 0;
                    }
                    //only ever increase weight
                    if (weight > 0 && weight < b.weight) weight = b.weight;

                    arr[targ.x - minx][targ.y - miny] = weight;
                })
            })
        }

        this.pathCache = { grid: arr, minx: minx, miny: miny }
        let graph = new Graph(arr);

        //TODO: snip above and cache
        // just need graph, min x and min y

        if (start.x === end.x && start.y === end.y) return [new Block(end)];

        start = graph.grid[start.x - minx][start.y - miny];
        end = graph.grid[end.x - minx][end.y - miny];
        let result = astar.search(graph, start, end);

        return result.map((res) => {
            return new Block({
                x: res.x + minx,
                y: res.y + miny,
            });
        });


    }

    save(): Object {
        return this.state;
    }
    clear() {
        this.state = {}
    }
    load(grid: Object) {
        Object.keys(grid).forEach((key) => {
            let block = parseKey(key);
            this.addNode(block.x, block.y, new Grid(grid[key]))
        })
    }

}