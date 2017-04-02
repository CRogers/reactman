/// <reference path="../typings/tsd.d.ts" />

import './libsetup.ts'

import * as $ from 'jquery'

import { keyPresses } from './inputs'
import { grid } from './view'
import { snake } from './snake';
import { vdomBaconjsRenderer } from './virtual-dom-renderer'
import * as Bacon from 'baconjs'

const GAP = 2;
const SIZE = 20;

$(() => {
    const snakeGrid = Bacon.constant({}).map(snakeData => {
        return grid(GAP, SIZE);
    });
    return vdomBaconjsRenderer($('.game')[0], snakeGrid);
});