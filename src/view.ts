/// <reference path="../typings/tsd.d.ts" />
import { h } from "virtual-dom";
import { Position } from "./position";
import { HEIGHT, WIDTH, MAP, GroundType } from "./map";
import { Reactman, DotState } from "./types";
import * as _ from 'lodash';

function px(num) { return `${num}px` }

function square(x: number, y: number, size: number, extraClass?: string) {
    let className = 'square ' + (extraClass ? extraClass : '');
    var style = {left: px(x), top: px(y), width: px(size), height: px(size)};
    return h('div', {className, style}, []);
}

function classForPosition(position: Position, reactman: Reactman): string {
    if (reactman.pacman.equals(position)) {
        return 'pacman';
    }

    if (_.some(reactman.dots, dot => dot.position === position && dot.state === DotState.ALIVE)) {
        return 'dot';
    }

    switch (MAP.groundAt(position)) {
        case GroundType.Wall:
            return 'wall';
        case GroundType.Space:
            return null;
    }
}

export function grid(gap: number, size: number, reactman: Reactman): VirtualDOM.VTree {
    let actualGap = gap + size;
    let pixelHeight = px(actualGap * HEIGHT);
    let squares = [];
    for(let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            let extraClass = classForPosition(Position.at(x, y), reactman);
            squares.push(square(x * actualGap, y * actualGap, size, extraClass));
        }
    }
    return h('div', {}, [
        h('.score', {}, ""+reactman.score),
        h('.reactman-game', {style: {height: pixelHeight}}, squares)
    ]);

}