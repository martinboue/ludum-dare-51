'use strict';

import {orderHolder} from "./components/orderHolder.js";

export function  generateBuildings() {
    const buildingPositions = [
        pos(288, 208),
        pos(384, 448),
        pos(976, 448),
        pos(976, 208),
    ].shuffle();

    const buildingInfos = [
        {name: "mcdo", sprite: sprite('mcdo'), color: color(255, 0, 0)},
        {name: "kfc", sprite: sprite('kfc'), color: color(0, 255, 0)},
        {name: "kebab56", sprite: sprite('kebab56'), color: color(0, 0, 255)},
        {name: "michel&nina", sprite: sprite('michel&nina'), color: color(255, 255, 0)},
    ].shuffle();

    return Array.zip(buildingInfos, buildingPositions).map(([info, posComp]) =>
        add([
            area(),
            solid(),
            posComp,
            info.sprite,
            info.name, // To use name has tag
            orderHolder(5),
            "building",
            {
                name: info.name
            }
        ])
    );
}