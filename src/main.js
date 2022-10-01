'use strict';

import kaboom from "kaboom";
import "./utils/array.js";

// Assets
import charactersAtlas from "../assets/Spritesheet/characters.png";
import foodAtlas from "../assets/Spritesheet/food.png";
import atlas from "../assets/Spritesheet/roguelikeCity_magenta.png";
import mcdo from '../assets/mcdo.png';
import kfc from '../assets/kfc.png';

// Data
import foodList from "./data/food.json";
import npcList from "./data/npc.json";

// Components
import { addDialog, generateOrder, updateItemList } from "./order.js";
import keyMove from "./keyMove.js";
import { levelBackgrounds, levels } from "./levels.js";
import { generateBuildings } from "./building.js";
import { spawnNpcs } from "./character.js";

kaboom({
  scale: 4,
  font: "sink"
});

// Characters animations
loadSpriteAtlas(charactersAtlas,
    npcList.reduce((prev, npc) => {
      prev[npc.code] = {
        x: 16 * npc.spriteIndex,
        y: 0,
        width: 16,
        height: 16 * 12,
        sliceY: 12,
        anims: {
          idle_left: 0,
          left: { from: 0, to: 2, speed: 5, loop: true },
          idle_bottom: 3,
          bottom: { from: 3, to: 5, speed: 5, loop: true },
          idle_top: 6,
          top: { from: 6, to: 8, speed: 5, loop: true },
          idle_right: 9,
          right: { from: 9, to: 11, speed: 5, loop: true }
        }
      }
      return prev
    }, {})
);

// Food sprites
loadSpriteAtlas(
  foodAtlas,
  foodList.reduce((prev, curr) => {
    prev[curr.code] = {
      x: 16 * curr.spriteX,
      y: 0,
      width: 16,
      height: 16
    };
    return prev;
  }, {}));

loadSpriteAtlas(atlas, {
  "road_top": {
    "x": 0,
    "y": 0,
    "width": 16,
    "height": 16,
  }
});

// BACKGROUND
loadSprite("levelBackground", levelBackgrounds[0]);

loadSprite('mcdo', mcdo);
loadSprite('kfc', kfc);

const background = add([
  sprite("levelBackground"),
]);

// MAP
const map = addLevel(levels[0], {
  width: 16,
  height: 16,
  "#": () => [
      area({width: 16, height: 16}),
      solid(),
  ],
  "o": () => ["npc_spawn"],
  "x": () => ["spawn"]
});

// PLAYER
const spawn = get("spawn")[0]
const player = add([
  sprite("male_1", { anim: "idle_bottom"}),
  pos(spawn.pos.x + 8, spawn.pos.y + 8),
  rotate(0),
  solid(),
  area({ width: 16, height: 16 }),
  origin("center"),
  keyMove(200),
  "deliverer",
]);

// Camera follow player
player.onUpdate(() => {
  camPos(player.pos);
});

const buildings = generateBuildings();

// List of all current orders
const orders = [];
// Create order dialog
const orderDialog = addDialog();

wait(3, () => {
  // Create new order every 10 seconds
  loop(10, () => {
    // Create order
    const order = generateOrder();

    // Add order to the queue
    orders.push(order);

    // Update dialog with hint
    orderDialog.show(order);

    // Update item list
    updateItemList(orders);
  });
});


// NPCs
const npcs = spawnNpcs();
