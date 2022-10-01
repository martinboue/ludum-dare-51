'use strict';

import kaboom from "kaboom";
import "./utils/array.js";

// Assets
import deliverer from "../assets/deliverer.png";
import foodAtlas from "../assets/Spritesheet/food.png";
import {levelBackgrounds, levels} from "./levels.js";
import mcdo from '../assets/mcdo.png';
import kfc from '../assets/kfc.png';
import phone from '../assets/phone.png';

// Components
import {addDialog, generateOrder, updateOrderItemList} from "./order.js";
import foodList from "./food.json";
import keyMove from "./keyMove.js";
import {generateBuildings} from "./building.js";
import {orderHolder} from "./orderHolder.js";

kaboom({
  scale: 4,
  font: "sink"
});

// Deliverer animations
loadSpriteAtlas(deliverer, {
  "deliverer": {
    x: 0,
    y: 0,
    width: 16,
    height: 192,
    sliceY: 12,
    anims: {
      idle_left: 0,
      left: {
        from: 0,
        to: 2,
        speed: 5,
        loop: true
      },
      idle_bottom: 3,
      bottom: {
        from: 3,
        to: 5,
        speed: 5,
        loop: true
      },
      idle_top: 6,
      top: {
        from: 6,
        to: 8,
        speed: 5,
        loop: true
      },
      idle_right: 9,
      right: {
        from: 9,
        to: 11,
        speed: 5,
        loop: true
      }
    }
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

loadSprite("levelBackground", levelBackgrounds[0]);

loadSprite('mcdo', mcdo);
loadSprite('kfc', kfc);

loadSprite('phone', phone);

const background = add([
  sprite("levelBackground"),
]);

const map = addLevel(levels[0], {
  width: 16,
  height: 16,
  "#": () => [
      area({width: 16, height: 16}),
      solid(),
  ]
});

const player = add([
  sprite("deliverer", { anim: "idle_bottom"}),
  pos(center()),
  rotate(0),
  solid(),
  area({ width: 16, height: 16 }),
  origin("center"),
  keyMove(200),
  orderHolder(),
  "deliverer",
]);

// Camera follow player
player.onUpdate(() => {
  camPos(player.pos);
});

// When player pick order
player.onPushOrder((order) => {

  // Create order item
  add([
    sprite(order.food.code),
    pos(0, 0),
    z(100),
    'orderItem',
    {
      fixed: true
    },
  ])

  updateOrderItemList();
})

onKeyPress('space', () => {
  every('building', (building) => {
    if (player.isTouching(building)) {
      // Take first order of the building
      const order = building.pollOrder();
      if (order) {
        orderDialog.showOrder(order);
        player.pushOrder(order);
      } else {
        shake(1);
        orderDialog.showNoOrder(order);
      }
    }
  })
})

// Restaurants
const buildings = generateBuildings();

// Create order dialog
const orderDialog = addDialog();

wait(3, () => {
  // Create new order every 10 seconds
  loop(10, () => {
    // Create order
    const order = generateOrder();

    // Pick random restaurant
    const building = buildings.shuffle()[0];
    building.pushOrder(order);

    // Update dialog with hint
    orderDialog.showSms(building.name, 'order for you');
  });
});
