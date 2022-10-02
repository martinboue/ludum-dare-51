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
import {addOrderItem, generateOrder} from "./order.js";
import keyMove from "./components/keyMove.js";
import {generateBuildings} from "./building.js";
import {orderHolder} from "./components/orderHolder.js";
import {spawnNpcs} from "./character.js";
import {elasped} from "./components/elasped.js";
import {addGlobalDialog} from "./globalDialog.js";
import {addPoints, addScore} from "./score.js";

const EXPLORATION_TIME = 1; // 30s

kaboom({
    scale: 4,
    font: "sink",
    background: [ 166, 169, 174 ]
});

// LOAD ASSETS

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

// INITIALIZE GAME OBJECTS

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

// Restaurants
const buildings = generateBuildings(deliverer);

// NPCs
spawnNpcs(deliverer).forEach((npc) => {
    npc.onCollide("deliverer", () => {
        npc.say(npc.identity.greeting);
    });
});

// Create globalDialog
const globalDialog = addGlobalDialog();

// Score
const score = addScore();

// Order timer
const orderTimer = add([
    text(''),
    pos(width() - 100, 12),
    fixed(),
    elasped(1, function () {
        this.text = `Next order: ${this.remainingTime}s`;
        this.remainingTime -= 1;
    }, () => {}, false),
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
    fixed(),
    color(0, 0, 0),
    elasped(3, function () {
        destroy(this);
    }),
]);

add([
    text('', {size: 12}),
    pos(center().x - 12, center().y - 50),
    fixed(),
    origin("center"),
    elasped(1, function () {
        if (this.remainingTime <= 0) {
            destroy(this);
            // When exploration time is done => start the game
            start();
            return;
        }
        this.text = `${this.remainingTime.pad('0', 2)}`;
        this.remainingTime -= 1;
        orderTimer.restart();
    }, () => {
        orderTimer.hidden = true;
        score.hidden = true;
    }),
    color(0, 0, 0),
    {
        remainingTime: EXPLORATION_TIME,
    }
]);

// GAME UPDATE

// Camera follow player
deliverer.onUpdate(() => {
    camPos(deliverer.pos);
});

const refreshOrderItems = () => {
    // Clear previous order items
    get('orderItem').forEach(destroy);

    // Create order item
    deliverer.getOrders().map((order, index) => addOrderItem(order, index));

    on('order-expired', 'orderItem', () => {
        // TODO: Decrease "life" + Game over
    });
};

// When player pick order
deliverer.onPushOrder(refreshOrderItems);
deliverer.onPollOrder(refreshOrderItems);

onKeyPress(['space', 'enter'], () => {
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

                    order.resetExpiration();
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
                const points = score.addScoreForOrder(o);
                addPoints(points, vec2(deliverer.pos.x, deliverer.pos.y - 25));
            });
        }
    });
});

// GAME START

const start = () => {
    orderTimer.hidden = false;
    score.hidden = false;

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
};