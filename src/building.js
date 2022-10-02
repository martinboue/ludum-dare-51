'use strict';

import {orderHolder} from "./components/orderHolder.js";
import talk from "./components/talk.js";

/**
 * @param deliverer the character to talk to
 * @param offset  for the frame around the map
 */
export function generateBuildings(deliverer, offset) {

    const buildingPositions = [
        // Position: top left corner
        { x: 48,  y: 32, width: 6 * 16, height: 7 * 16 },
        { x: 512, y: 16, width: 8 * 16, height: 8 * 16 },
        { x: 336, y: 240, width: 5 * 16, height: 8 * 16 },
        { x: 96,  y: 496, width: 5 * 16, height: 7 * 16 },
        { x: 608, y: 480, width: 6 * 16, height: 8 * 16 }
    ]

    // TODO : il manque d'afficher le nom du restaurant sur le sprite
    const buildingInfos = [
        {name: "Big Donald", color: color(255, 0, 0)},
        {name: "KCF", color: color(0, 255, 0)},
        {name: "Kebab56", color: color(0, 0, 255)},
        {name: "Michel & Nina", color: color(255, 255, 0)},
        {name: "Grominos", color: color(0, 125, 0)},
    ]
    // TODO : pour l'instant je désactive le .shuffle(); car manque d'indication

    return Array.zip(buildingInfos, buildingPositions).map(([info, posSize]) =>
        add([
            area(),
            solid(),
            // Convert position to origin center
            pos(posSize.x + offset + posSize.width / 2, posSize.y + offset + posSize.height / 2),
            origin("center"),
            talk(deliverer, {
                width: 150,
                offset: { x: 0, y: 0 }
            }),
            info.name, // To use name has tag
            orderHolder(5),
            "building",
            {
                // Shape for area :
                width: posSize.width,
                height: posSize.height,

                // Additional info :
                name: info.name,
            }
        ])
    );
}