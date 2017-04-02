/// <reference path="../typings/tsd.d.ts" />

import { h } from 'virtual-dom'
import * as _ from 'lodash'

import { Position } from './position'
import { Snake, Reactman } from './types'
import { HEIGHT, WIDTH, MAP, GroundType } from "./map";
import { snake } from "./snake";

function px(num) { return `${num}px` }

function square(x: number, y: number, size: number, extraClass?: string) {
    let className = 'square ' + (extraClass ? extraClass : '');
    var style = {left: px(x), top: px(y), width: px(size), height: px(size)};
    return h('div', {className, style}, []);
}

function classForPosition(position: Position): string {
    switch (MAP.groundAt(position)) {
        case GroundType.Wall:
            return 'wall';
        case GroundType.Space:
            return null;
    }
}

export function grid(gap: number, size: number): VirtualDOM.VTree {
    let actualGap = gap + size;
    let pixelHeight = px(actualGap * HEIGHT);
    let squares = [];
    for(let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let extraClass = classForPosition(Position.at(x, y));
            squares.push(square(x * actualGap, y * actualGap, size, extraClass));
        }
    }
    return h('.reactman-game', {style: {height: pixelHeight}}, squares);

}