import { Position } from "./position";
import { Observable, Property, Stream } from "./bacon-extras";
import { Reactman } from "./types";
import * as Bacon from "baconjs";
import { MAP, GroundType } from "./map";
import { Keys } from "./inputs";
import { Direction } from "./direction";

const map = MAP;

interface PositionAndDirection {
    position: Position;
    direction: Direction;
}

export function reactman(keyPresses: Observable<Direction>): Property<Reactman> {
    const directionToGoNext: Property<Direction> = keyPresses.scan(Direction.right(), (currentDir, keyPress) => {
        return keyPress;
    });

    const gameTick: Stream<any> = Bacon.repeatedly(100, [null]);

    const directionToGoNextOnTick: Stream<Direction> = directionToGoNext.sampledBy(gameTick);

    const position: Property<PositionAndDirection> = directionToGoNextOnTick.scan({position: Position.at(1, 1), direction: Direction.right()}, (currentPosAndDir, direction) => {
        let whereWeWantToGo = currentPosAndDir.position.advance(direction);
        const groundWhereWeWantToGo = MAP.groundAt(whereWeWantToGo)
        if (groundWhereWeWantToGo === GroundType.Space) {
            return {position: whereWeWantToGo, direction };
        }

        let directlyAhead = currentPosAndDir.position.advance(currentPosAndDir.direction);
        const groundAhead = MAP.groundAt(directlyAhead);
        if (groundAhead === GroundType.Space) {
            return {position: directlyAhead, direction: currentPosAndDir.direction};
        }

        return currentPosAndDir;
    });

    return position.map(posAndDir => ({pacman: posAndDir.position}));
}