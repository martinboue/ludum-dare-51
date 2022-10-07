'use strict';

import {orderHolder} from "../components/orderHolder.js";
import talk from "../components/talk.js";

/**
 * @param deliverer the character to talk to
 * @param offset  for the frame around the map
 */
export function generateBuildings(deliverer, offset) {

    // Position is top left corner of the build. Can be found on Tiled.
    const buildings = [
        { name: "Big Donald", color: "yellow", x: 48,  y: 32, width: 6 * 16, height: 7 * 16, food: "burger" },
        { name: "KCF", color: "red", x: 512, y: 16, width: 8 * 16, height: 8 * 16, food: "chicken" },
        { name: "Chuchichop", color: "green", x: 336, y: 240, width: 5 * 16, height: 8 * 16, food: "sushi" },
        { name: "Chef Michel", color: "grey", x: 96,  y: 496, width: 5 * 16, height: 7 * 16, food: "meal" },
        { name: "Gromino's", color: "blue", x: 608, y: 480, width: 6 * 16, height: 8 * 16, food: "pizza" },
    ]

    return buildings.map(building =>
        add([
            area(),
            solid(),
            // Convert position to origin center
            pos(building.x + offset + building.width / 2, building.y + offset + building.height / 2),
            origin("center"),
            talk(deliverer, {
                width: 150,
                offset: { x: 0, y: 0 }
            }),
            orderHolder(5),
            building.name, // To use name has tag
            "building",
            {
                // Shape for area :
                width: building.width,
                height: building.height,

                // Additional info :
                name: building.name,
                food: building.food,
                color: building.color
            }
        ])
    );
}