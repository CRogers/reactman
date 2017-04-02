import { Position } from './position'

export interface Snake {
    head: Position,
    tail: Position[],
    food: Position
}

export interface Reactman {
    pacman: Position
}