'use strict';

import kaboom from "kaboom";
import "./utils/array.js";
import "./utils/number.js";

// Assets
import delivererAtlas from "../assets/sprites/deliverer.png";
import skinsAtlas from "../assets/sprites/skins.png";
import foodAtlas from "../assets/sprites/food.png";
import inputsAtlas from "../assets/sprites/inputs.png";
import {levelBackgrounds, levels} from "./levels.js";
import mcdo from '../assets/mcdo.png';
import kfc from '../assets/kfc.png';
import michelNina from '../assets/michel&nina.png';
import kebab56 from '../assets/kebab56.png';
import phone from '../assets/phone.png';

// Data
import foodList from "./data/food.json";
import orderLines from "./data/order-lines.json";

// Components
import {addOrderItem, generateOrder} from "./order.js";
import keyMove from "./components/keyMove.js";
import {generateBuildings} from "./building.js";
import {orderHolder} from "./components/orderHolder.js";
import {spawnNpcs} from "./character.js";
import {elasped} from "./components/elasped.js";
import {addGlobalDialog} from "./globalDialog.js";
import {showPoints, addScore} from "./score.js";
import {addGlobalHelper} from "./globalHelper.js";

// GAME CONSTANTS
const EXPLORATION_TIME = 1; // seconds
const NEW_ORDER_TIME = 10; // seconds
const DELIVERY_TIME = 30; // seconds
const NB_NPC = 10;
const WRONG_NPC_POINTS = 10;
const PLAYER_SPEED = 150; // pixel/seconds

kaboom({
    scale: 4,
    font: "sink",
    background: [ 185, 197, 202 ]
});

// LOAD ASSETS
loadSpriteAtlas(inputsAtlas, {
    input_enter: { x: 0, y: 0, width: 40, height: 16 },
    input_space: { x: 0, y: 16, width: 40, height: 16 },
    input_up: { x: 40, y: 0, width: 15, height: 16 },
    input_right: { x: 55, y: 0, width: 15, height: 16 },
    input_down: { x: 40, y: 16, width: 15, height: 16 },
    input_left: { x: 55, y: 16, width: 15, height: 16 }
});

// Deliver animations
loadSpriteAtlas(delivererAtlas, {
    npc: {
        x: 0,
        y: 0,
        width: 16 * 4,
        height: 16,
        sliceX: 4,
        anims: {
            idle_left: 0,
            idle_bottom: 1,
            idle_top: 2,
            idle_right: 3,
        }
    },
    deliverer: {
        x: 64,
        y: 0,
        width: 16 * 12,
        height: 16,
        sliceX: 12,
        anims: {
            idle_left: 0,
            left: { from: 0, to: 2, speed: 10, loop: true },
            idle_bottom: 3,
            bottom: { from: 3, to: 5, speed: 10, loop: true },
            idle_top: 6,
            top: { from: 6, to: 8, speed: 10, loop: true },
            idle_right: 9,
            right: { from: 9, to: 11, speed: 10, loop: true }
        }
    }
});

// NPC skins
loadSpriteAtlas(skinsAtlas, {
    top: {
        x: 0,
        y: 0,
        width: 16 * 6 * 4,
        height: 16,
        sliceX: 6 * 4,
    },
    bottom: {
        x: 0,
        y: 16,
        width: 16 * 6 * 4,
        height: 16,
        sliceX: 6 * 4
    },
    hair: {
        x: 0,
        y: 32,
        width: 16 * 6 * 4,
        height: 16,
        sliceX: 6 * 4
    }
});

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
    // 1 tile offset to add frame around map
    // to prevent user from getting outside
    pos(16, 16)
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

// Create globalHelper
const globalHelper = addGlobalHelper();

// PLAYER
const spawn = get("spawn")[0];
const deliverer = add([
  sprite("deliverer", { anim: "idle_bottom"}),
  pos(spawn.pos.x + 8, spawn.pos.y + 8),
  rotate(0),
  solid(),
  area({ width: 12, height: 12 }),
  origin("bot"),
  keyMove(PLAYER_SPEED, globalHelper),
  orderHolder(2),
  "deliverer",
]);

// Create globalDialog
const globalDialog = addGlobalDialog();

// Restaurants
const buildings = generateBuildings(deliverer);

// NPCs
spawnNpcs(deliverer, NB_NPC).forEach(npc => {
    npc.onCollide("deliverer", () => {
        npc.say(npc.identity.greeting);
    });
});

// Use global helper
deliverer.onCollide("building", building => {
    globalHelper.show("input_space", "to take order", building)
});
deliverer.onCollide("npc", npc => {
    if (deliverer.hasOrders()) {
        globalHelper.show("input_space", "to deliver", npc)
    }
})


// Score
const score = addScore();

// Order timer
const orderTimer = add([
    text('', { size: 8, font: "sinko" }),
    pos(width() - 12, 12),
    origin("right"),
    fixed(),
    elasped(1, function () {
        this.text = `Next order in ${this.remainingTime}`;
        this.remainingTime -= 1;
    }, () => {}, false),
    {
        remainingTime: NEW_ORDER_TIME,
    }
]);

// Exploration timer
add([
    text('Explore the city!', { size: 10, font: "sinko" }),
    pos(center().x, center().y - 30),
    origin('center'),
    fixed(),
    elasped(3, function () {
        destroy(this);
    }),
]);

add([
    text('', { size: 12, font: "sinko" }),
    pos(center().x, center().y - 50),
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

    on('order-expired', 'orderItem', (orderItem, order) => {
        deliverer.removeOrder(order);
    });
};

// When player pick order
deliverer.onPushOrder(refreshOrderItems);
deliverer.onPollOrder(refreshOrderItems);

onKeyPress(['space', 'enter'], () => {
    every('building', (building) => {
        if (deliverer.isTouching(building)) {
            // Take first order of the building (we don't delete it right now in case the player can't take it)
            const order = building.peekOrder();
            if (order) {
                if (deliverer.isFull()) {
                    shake(1);
                    building.say("You have too many orders! Deliver them first and then come back to me.");
                } else {
                    building.say(order.deliveryInfo.hint);

                    order.resetExpiration();
                    deliverer.pushOrder(building.pollOrder());
                }
            } else {
                shake(1);
                building.say('Sorry, no orders for you.');
            }
        }
    });

    every('npc', (npc) => {
        if (deliverer.isTouching(npc)) {
            const orders = deliverer.popOrdersFor(npc);

            // If there is at least one order for this NPC
            if (orders.length > 0) {
                orders.forEach(o => {
                    npc.say("Thanks for the order!");
                    const points = score.addScoreForOrder(o);
                    showPoints(points, deliverer);
                });
            }
            // Lose points if asking the wrong NPC
            else if (deliverer.hasOrders()) {
                npc.say("No, this is not my order.")
                score.decreaseScore(WRONG_NPC_POINTS)
                showPoints(WRONG_NPC_POINTS, deliverer)
            }
        }
    });
});

// GAME START

const start = () => {
    orderTimer.hidden = false;
    score.hidden = false;

    // Create new order every x seconds
    loop(NEW_ORDER_TIME + 1, () => {
        // Pick random restaurant (only those with a place for an order)
        const notFullBuildings = buildings.filter(b => !b.isFull());
        if (!Array.empty(notFullBuildings)) {
          const building = notFullBuildings.shuffle()[0];
          building.pushOrder(generateOrder(get('npc'), DELIVERY_TIME));

          // Update globalDialog with hint
          globalDialog.show(building.name, orderLines.pickRandom());
        }

        orderTimer.remainingTime = NEW_ORDER_TIME;
    });
};