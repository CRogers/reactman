import {Position} from "./position";
import { Direction } from "./direction";

export enum GroundType {
    Wall,
    Space,
    Dot
}

export function isMovable(groundType: GroundType): boolean {
    return groundType !== GroundType.Wall;
}

const rawMap = `
XXXXXXXXX
X.......X
X.XX.XX.X
X.XX.XX.X
X.XX.XX.X
X.......X
XXXXXXXXX
`.trim()
    .split('\n')
    .map(line => line.split('')
        .map(char => {
            switch (char) {
                case 'X':
                    return GroundType.Wall;
                case ' ':
                    return GroundType.Space;
                case '.':
                    return GroundType.Dot;
            }
        }));

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

    public groundAt(position: Position): GroundType {
        return rawMap[position.y][position.x];
    }

    public allOfType(groundType: GroundType): Position[] {
        const positions = [];
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                if (rawMap[y][x] === groundType) {
                    positions.push(Position.at(x, y));
                }
            }
        }

        return positions;
    }
}

export const MAP = new Map();