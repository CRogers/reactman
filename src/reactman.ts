import { Position } from "./position";
import { Observable, Property, Stream } from "./bacon-extras";
import { Reactman, Dot, DotState } from "./types";
import * as Bacon from "baconjs";
import { MAP, isMovable, GroundType } from "./map";
import { Direction } from "./direction";

const map = MAP;

interface PositionAndDirection {
    position: Position;
    direction: Direction;
}

function pacman(keyPresses: Observable<Direction>) {
    const directionToGoNext: Property<Direction> = keyPresses.scan(Direction.down(), (currentDir, keyPress) => {
        return keyPress;
    });

    const gameTick: Stream<any> = Bacon.repeatedly(100, [null]);

    const directionToGoNextOnTick: Stream<Direction> = directionToGoNext.sampledBy(gameTick);

    const position: Property<PositionAndDirection> = directionToGoNextOnTick.scan({
        position: Position.at(1, 1),
        direction: Direction.down()
    }, (currentPosAndDir, direction) => {
        let whereWeWantToGo = currentPosAndDir.position.advance(direction);
        const groundWhereWeWantToGo = MAP.groundAt(whereWeWantToGo);
        if (isMovable(groundWhereWeWantToGo)) {
            return {position: whereWeWantToGo, direction};
        }

        let directlyAhead = currentPosAndDir.position.advance(currentPosAndDir.direction);
        const groundAhead = MAP.groundAt(directlyAhead);
        if (isMovable(groundAhead)) {
            return {position: directlyAhead, direction: currentPosAndDir.direction};
        }

        return currentPosAndDir;
    });
    return position.map(posAndDir => posAndDir.position);
};

function dot(dotPosition: Position, pacman: Property<Position>): Stream<Dot> {
    const dotState = pacman.skipDuplicates().scan(DotState.ALIVE, (dotState, pacmanPos) => {
        if (pacmanPos === dotPosition) {
            return DotState.EATEN;
        }

        return dotState;
    });

    return dotState
        .toEventStream()
        .map(dotState => ({ state: dotState, position: dotPosition }));
}

function dots(pacman: Property<Position>): Stream<Dot[]> {
    const dotPositions: Position[] = MAP.allOfType(GroundType.Dot);
    const dots: Stream<Dot>[] = dotPositions.map(dotPosition => dot(dotPosition, pacman));
    return Bacon.zipAsArray(dots);
}

export function reactman(keyPresses: Observable<Direction>): Property<Reactman> {
    let pacmanPosition = pacman(keyPresses);
    return Bacon.combineTemplate({
        pacman: pacmanPosition,
        dots: dots(pacmanPosition)
    });
}