'use strict';

import kaboom from "kaboom";
import "./utils/array.js";
import "./utils/number.js";

// Assets
import charactersAtlas from "../assets/Spritesheet/characters.png";
import foodAtlas from "../assets/Spritesheet/food.png";
import {levelBackgrounds, levels} from "./levels.js";
import mcdo from '../assets/mcdo.png';
import kfc from '../assets/kfc.png';
import michelNina from '../assets/michel&nina.png';
import kebab56 from '../assets/kebab56.png';
import phone from '../assets/phone.png';

// Data
import foodList from "./data/food.json";
import npcList from "./data/characters.json";
import orderLines from "./data/order-lines.json";

// Components
import {generateOrder} from "./order.js";
import keyMove from "./components/keyMove.js";
import {generateBuildings} from "./building.js";
import {orderHolder} from "./components/orderHolder.js";
import {spawnNpcs} from "./character.js";
import {elasped} from "./components/elasped.js";
import {addGlobalDialog} from "./globalDialog.js";

const EXPLORATION_TIME = 30; // 30s

kaboom({
    scale: 4,
    font: "sink",
    background: [ 166, 169, 174 ]
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
loadSprite('michel&nina', michelNina);
loadSprite('kebab56', kebab56);

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
const deliverer = add([
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
deliverer.onUpdate(() => {
  camPos(deliverer.pos);
});

const refreshOrderItems = () => {
  // Clear previous order items
  get('orderItem').forEach(destroy);

  // Create order item
  const margin = 2;
  deliverer.getOrders().forEach((order, index) =>
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
};

// When player pick order
deliverer.onPushOrder(refreshOrderItems);
deliverer.onPollOrder(refreshOrderItems);

onKeyPress('space', () => {
  every('building', (building) => {
    if (deliverer.isTouching(building)) {
        // Take first order of the building (we don't delete it right now in cas the player can't take it)
        const order = building.peekOrder();
        if (order) {
          if (deliverer.isFull()) {
            shake(1);
            building.say("You can't carry this order, go deliver your orders and get back to me later!");
          } else {
            building.say(order.deliveryInfo.hint);
            deliverer.pushOrder(building.pollOrder());
          }
        } else {
            shake(1);
            building.say('Sorry, no order for you.');
        }
    }
  });

  every('npc', (npc) => {
    if (deliverer.isTouching(npc)) {
      const orders = deliverer.popOrdersFor(npc);

      orders.forEach(o => {
          npc.say("Thank for the order !");
      });
    }
  });
});

// Restaurants
const buildings = generateBuildings(deliverer);

// NPCs
spawnNpcs(deliverer).forEach((npc) => {
    npc.onCollide("deliverer", () => {
        npc.say(npc.presentation());
    });
})

// Create globalDialog
const globalDialog = addGlobalDialog();

// Order timer
const orderTimer = add([
    text(''),
    pos(width() - 100, 12),
    fixed(),
    elasped(1, function () {
        this.text = `Next order: ${this.remainingTime}s`;
        this.remainingTime -= 1;
    }, false),
    color(0, 0, 0),
    {
        remainingTime: 10,
    }
]);

// Exploration timer
add([
    text('Explore !', {size: 12}),
    pos(center().x - 12, center().y - 25),
    origin('center'),
    color(0, 0, 0),
    elasped(3, function () {
        destroy(this);
    }),
    fixed(),
]);

add([
    text('', {size: 12}),
    pos(center().x - 12, center().y - 50),
    fixed(),
    origin("center"),
    elasped(1, function () {
        if (this.remainingTime <= 0) {
            destroy(this);
            return;
        }
        this.text = `${this.remainingTime.pad('0', 2)}`;
        this.remainingTime -= 1;
        orderTimer.restart();
    }),
    color(0, 0, 0),
    {
        remainingTime: EXPLORATION_TIME,
    }
]);

wait(EXPLORATION_TIME, () => {
    // Create new order every 10 seconds
    loop(11, () => {
        // Pick random restaurant (only those with a place for an order)
        const notFullBuildings = buildings.filter(b => !b.isFull());
        if (!Array.empty(notFullBuildings)) {
          const building = notFullBuildings.shuffle()[0];
          building.pushOrder(generateOrder(get('npc')));

          // Update globalDialog with hint
          globalDialog.show(building.name, orderLines.pickRandom());
        }

        orderTimer.remainingTime = 10;
    });
});