'use strict';

import kaboom from "kaboom";
import "./utils/array.js";
import "./utils/number.js";

// Assets
import delivererAtlas from "../assets/sprites/deliverer.png";
import skinsAtlas from "../assets/sprites/skins.png";
import foodAtlas from "../assets/sprites/food.png";
import inputsAtlas from "../assets/sprites/inputs.png";
import phone from '../assets/phone.png';
import cross from '../assets/cross.png';
import music from "../assets/sounds/S31-City on Speed.ogg"

// Fixme: not working on itch.io if asset import is not in main.js
import level0Background from "../assets/sprites/map.png";

import {levels} from "./levels.js";

// Data
import foodList from "./data/food.json";
import orderLines from "./data/order-lines.json";

// Components
import {addOrderItem, addOrderMiss, generateOrder} from "./order.js";
import keyMove from "./components/keyMove.js";
import {generateBuildings} from "./building.js";
import {orderHolder} from "./components/orderHolder.js";
import {spawnNpcs} from "./character.js";
import {elasped} from "./components/elasped.js";
import {addGlobalDialog} from "./globalDialog.js";
import {showPoints, addScore} from "./score.js";
import {addGlobalHelper} from "./globalHelper.js";
import {addGameOver} from "./gameOver.js";

// GAME CONSTANTS
const EXPLORATION_TIME = 30; // seconds
const NEW_ORDER_TIME = 10; // seconds
const DELIVERY_TIME = 30; // seconds
const NB_NPC = 10;
const WRONG_NPC_POINTS = 10;
const PLAYER_SPEED = 150; // pixel/seconds
const MAX_MISSED_ORDER = 3; // Game over if 3 missed order
const PLAYER_MAX_CARRIED_ORDERS = 2;
const SHAKE_INTENSITY = 1;

kaboom({
    scale: 4,
    font: "sink",
    background: [ 185, 197, 202 ]
});


// MUSIC
loadSound("music", music);
play("music", {
    volume: 0.1,
    loop: true
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
loadSprite("levelBackground", level0Background);

loadSprite('phone', phone);
loadSprite('cross', cross);

// INITIALIZE GAME OBJECTS

// BACKGROUND map
const mapFrameOffset = 16;
add([
    sprite("levelBackground"),
    // 1 tile offset to add frame around map
    // to prevent user from getting outside
    pos(mapFrameOffset, mapFrameOffset)
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
  orderHolder(PLAYER_MAX_CARRIED_ORDERS),
  "deliverer",
]);

// Create globalDialog
const globalDialog = addGlobalDialog();

// Restaurants
const buildings = generateBuildings(deliverer, mapFrameOffset);

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
    pos(width() - 12, height() - 12),
    origin("right"),
    z(95),
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

// Refresh order items display
const refreshOrderItems = () => {
    // Clear previous order items
    get('orderItem').forEach(destroy);

    // Create order item
    deliverer.getOrders().map((order, index) => addOrderItem(order, index));
};

// When player pick order
deliverer.onPushOrder(refreshOrderItems);
deliverer.onPollOrder(refreshOrderItems);

// Game over
// Game over text
const gameOver = addGameOver();
gameOver.hidden = true;

const showGameOver = () => {
    gameOver.hidden = false;

    orderTimer.hidden = true;

    deliverer.clear();

    every('orderItem', destroy);
    every('orderMiss', destroy);

    every("building", (building) => {
        // Remove all generated commands
        building.clear();
    });
}

// When order expired
on('order-expired', 'orderItem', (orderItem, order) => {
    deliverer.removeOrder(order);

    // Add miss
    const numberOfMisses = get('orderMiss').length;

    addOrderMiss(order, numberOfMisses);
    shake(SHAKE_INTENSITY); // Shake off course

    if (numberOfMisses + 1 >= MAX_MISSED_ORDER) {
        showGameOver();
    }
});

onKeyPress(['space', 'enter'], () => {
    every('building', (building) => {
        if (deliverer.isTouching(building)) {
            // Take first order of the building (we don't delete it right now in case the player can't take it)
            const order = building.peekOrder();
            if (order) {
                if (deliverer.isFull()) {
                    shake(SHAKE_INTENSITY);
                    building.say(`[${building.name}].red[:You have too many orders! Deliver them first and then come back to me.].black`);
                } else {
                    building.say(order.deliveryInfo.hint);

                    order.resetExpiration();
                    deliverer.pushOrder(building.pollOrder());
                }
            } else {
                shake(SHAKE_INTENSITY);
                building.say(`[${building.name}].red[: No orders for you.].black`);
            }
        }
    });

    every('npc', (npc) => {
        if (deliverer.isTouching(npc)) {
            const orders = deliverer.popOrdersFor(npc);

            // If there is at least one order for this NPC
            if (orders.length > 0) {
                orders.forEach(o => {
                    npc.say("[Thanks for the order!].black");
                    const points = score.addScoreForOrder(o);
                    showPoints(points, deliverer);
                });
            }
            // Lose points if asking the wrong NPC
            else if (deliverer.hasOrders()) {
                shake(SHAKE_INTENSITY);
                npc.say("[No, this is not my order.].black")
                score.decreaseScore(WRONG_NPC_POINTS)
                showPoints(-WRONG_NPC_POINTS, deliverer)
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
        if (!gameOver.hidden) return;

        // Pick random restaurant (only those with a place for an order)
        const notFullRestaurants = buildings.filter(b => !b.isFull());
        if (!Array.empty(notFullRestaurants)) {
          const restaurant = notFullRestaurants.pickRandom();
            restaurant.pushOrder(generateOrder(get('npc'), restaurant, DELIVERY_TIME));

          // Update globalDialog with hint
          globalDialog.show(restaurant.name, orderLines.pickRandom());
        }

        orderTimer.remainingTime = NEW_ORDER_TIME;
    });
};
