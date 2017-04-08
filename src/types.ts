import { Position } from './position'

export enum DotState {
    ALIVE,
    EATEN
}

export interface Dot {
    state: DotState;
    position: Position;
}

export interface Reactman {
    pacman: Position,
    dots: Dot[]
}