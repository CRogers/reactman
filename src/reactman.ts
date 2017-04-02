import { Position } from "./position";
import { Stream, Property } from "./bacon-extras";
import { Reactman } from "./types";
import * as Bacon from 'baconjs'

export function reactman(): Property<Reactman> {
    return Bacon.constant({ pacman: Position.at(1, 1) });
}