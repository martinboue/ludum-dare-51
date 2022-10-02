'use strict';

import {orderHolder} from "./components/orderHolder.js";
import talk from "./components/talk.js";

export function generateBuildings(deliverer) {
    // FIXME : Add 1 to y for triggering onCollideEvent because there is wall
    // TODO : plus tard il ne faudra pas mettre de mur devant les batiments
    const buildingPositions = [
        pos(288, 208 + 1),
        pos(384, 448 + 1),
        pos(976, 448 + 1),
        pos(976, 208 + 1),
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
            talk(deliverer, {
                width: 150,
                offset: {
                    x: 50,
                    y: 50,
                }
            }),
            info.sprite,
            info.name, // To use name has tag
            orderHolder(5),
            "building",
            {
                name: info.name,
            }
        ])
    );
}