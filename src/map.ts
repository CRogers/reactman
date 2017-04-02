import {Position} from "./position";
import { Direction } from "./direction";

export enum GroundType {
    Wall,
    Space
}

const rawMap = `
XXXXXXXX
X      X
X XXXX X
X XXXX X
X XXXX X
X      X
XXXXXXXX
`.trim()
    .split('\n')
    .map(line => line.split('')
        .map(char => char === 'X' ? GroundType.Wall : GroundType.Space));

console.log(rawMap)

export const HEIGHT = rawMap.length;
export const WIDTH = rawMap[0].length;

class Map {
    private readonly fromTo: _.Dictionary<Direction[]> = {};

    constructor() {
        for (let j = 1; j < HEIGHT - 1; j++) {
            for (let i = 1; i < WIDTH - 1; i++) {
                const nexts = [];
                this.fromTo[Position.at(i, j).toString()] = nexts;

                if (rawMap[j][i] === GroundType.Wall) {
                    continue;
                }

                if (rawMap[j-1][i] === GroundType.Space) {
                    nexts.push(Direction.up());
                }

                if (rawMap[j+1][i] === GroundType.Space) {
                    nexts.push(Direction.down());
                }

                if (rawMap[j][i-1] === GroundType.Space) {
                    nexts.push(Direction.left());
                }

                if (rawMap[j][i+1] === GroundType.Space) {
                    nexts.push(Direction.right());
                }
            }
        }
    }

    public directionToGo(at: Position, facing: Direction, wantsToGo: Direction): Position {
        const nexts = this.fromTo[at.toString()];

        if (nexts.indexOf(wantsToGo) !== -1) {
            return at.advance(wantsToGo);
        }

        if (nexts.indexOf(facing) !== -1) {
            return at.advance(facing);
        }

        return at;
    }

    public groundAt(position: Position): GroundType {
        return rawMap[position.y][position.x];
    }
}

export const MAP = new Map();