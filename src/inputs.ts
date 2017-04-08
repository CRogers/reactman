/// <reference path="../typings/tsd.d.ts" />

import * as _ from 'lodash'
import * as $ from 'jquery'

import { Stream, Observable } from './bacon-extras'
import { Direction } from "./direction";

export enum Keys {
  LEFT = 37,
  RIGHT = 39,
  UP= 38,
  DOWN = 40
}

export function keyPresses(): Stream<Direction> {
  return $(document).asEventStream('keydown')
      .throttle(20)
      .map(jqEvent => <Keys>jqEvent.which)
      .map(key => {
          switch (key) {
            case Keys.LEFT:
              return Direction.left();
            case Keys.RIGHT:
              return Direction.right();
            case Keys.UP:
              return Direction.up();
            case Keys.DOWN:
              return Direction.down();
          }
      });
}