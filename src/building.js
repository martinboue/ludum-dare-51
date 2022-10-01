'use strict';

import {orderHolder} from "./components/orderHolder.js";

export function  generateBuildings() {
    const buildingPositions = [
        pos(304, 16),
        pos(320, 176),
        pos(320, 496),
        pos(944, 656),
        pos(1088, 416),
    ].shuffle();

    const buildingInfos = [
        {name: "mcdo", sprite: sprite('mcdo'), color: color(255, 0, 0)},
        {name: "kfc", sprite: sprite('kfc'), color: color(0, 255, 0)},
        {name: "kebab56", sprite: sprite('mcdo'), color: color(0, 0, 255)},
        {name: "michel&nina", sprite: sprite('mcdo'), color: color(255, 255, 0)},
        {name: "flunch", sprite: sprite('mcdo'), color: color(255, 0, 255)},
    ].shuffle();

    return Array.zip(buildingInfos, buildingPositions).map(([info, posComp]) =>
        add([
            area(),
            solid(),
            posComp,
            info.sprite,
            info.color,
            info.name, // To use name has tag
            orderHolder(5),
            "building",
            {
                name: info.name
            }
        ])
    );
}