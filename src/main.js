'use strict';

import kaboom from "kaboom";
import "./utils/array.js";

// Assets
import charactersAtlas from "../assets/Spritesheet/characters.png";
import foodAtlas from "../assets/Spritesheet/food.png";
import {levelBackgrounds, levels} from "./levels.js";
import mcdo from '../assets/mcdo.png';
import kfc from '../assets/kfc.png';
import phone from '../assets/phone.png';

// Data
import foodList from "./data/food.json";
import npcList from "./data/characters.json";
import orderLines from "./data/order-lines.json";

// Components
import { addDialog, generateOrder } from "./order.js";
import keyMove from "./components/keyMove.js";
import {generateBuildings} from "./building.js";
import {orderHolder} from "./components/orderHolder.js";
import {spawnNpcs} from "./character.js";

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
      };
      return prev;
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

// BACKGROUND
loadSprite("levelBackground", levelBackgrounds[0]);

loadSprite('mcdo', mcdo);
loadSprite('kfc', kfc);

loadSprite('phone', phone);

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
const spawn = get("spawn")[0];
const player = add([
  sprite("male_1", { anim: "idle_bottom"}),
  pos(spawn.pos.x + 8, spawn.pos.y + 8),
  rotate(0),
  solid(),
  area({ width: 16, height: 16 }),
  origin("center"),
  keyMove(200),
  orderHolder(2),
  "deliverer",
]);

// Camera follow player
player.onUpdate(() => {
  camPos(player.pos);
});

const refreshOrderItems = (orders) => {
  // Clear previous order items
  get('orderItem').forEach(destroy);

  // Create order item
  const margin = 2;
  orders.forEach((order, index) =>
      add([
        sprite(order.food.code),
        pos(index * 16 + (index + 1) * margin, margin),
        z(100),
        'orderItem',
        {
          fixed: true
        },
      ])
  );
}

// When player pick order
player.onPushOrder((order) => refreshOrderItems([order]));
player.onPollOrder(refreshOrderItems);

onKeyPress('space', () => {
  every('building', (building) => {
    if (player.isTouching(building)) {
        // Take first order of the building (we don't delete it right now in cas the player can't take it)
        const order = building.peekOrder();
        if (order) {
          if (player.isFull()) {
            shake(1);
            orderDialog.showSms(building.name, "You can't carry this order, go deliver your orders and get back to me later!");
          } else {
            orderDialog.showOrder(order);
            player.pushOrder(building.pollOrder());
          }
        } else {
          shake(1);
          orderDialog.showNoOrder(order);
        }
    }
  });

  every('npc', (npc) => {
    if (player.isTouching(npc)) {
      const orders = player.getOrdersFor(npc);
    }
  })
});

// Restaurants
const buildings = generateBuildings();

// Create order dialog
const orderDialog = addDialog();

wait(3, () => {
  // Create new order every 10 seconds
  loop(10, () => {
    // Pick random restaurant (only those with a place for an order)
    const notFullBuildings = buildings.filter(b => !b.isFull());
    if (!Array.empty(notFullBuildings)) {
      const building = notFullBuildings.shuffle()[0];
      building.pushOrder(generateOrder(get('npc')));

      // Update dialog with hint
      orderDialog.showSms(building.name, orderLines.pickRandom());
    }
  });
});


// NPCs
const npcs = spawnNpcs();
