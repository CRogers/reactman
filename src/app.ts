import "./libsetup.ts";
import * as $ from "jquery";
import { grid } from "./view";
import { vdomBaconjsRenderer } from "./virtual-dom-renderer";
import { reactman } from "./reactman";
import { keyPresses } from "./inputs";

const GAP = 2;
const SIZE = 20;

$(() => {
    const snakeGrid = reactman(keyPresses()).map(rm => {
        return grid(GAP, SIZE, rm);
    });
    return vdomBaconjsRenderer($('.game')[0], snakeGrid);
});