import kaboom from "kaboom";

// Assets
import deliverer from "../assets/deliverer.png";
import atlas from "../assets/Spritesheet/roguelikeCity_magenta.png";
import {addDialog, generateOrder} from "./order.js";
import keyMove from "./keyMove.js";
import {levelBackgrounds, levels} from "./levels.js";

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

loadSpriteAtlas(atlas, {
  "road_top": {
    "x": 0,
    "y": 0,
    "width": 16,
    "height": 16,
  }
});

loadSprite("levelBackground", levelBackgrounds[0]);

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
  keyMove(120),
  "deliverer",
]);

// Camera follow player
player.onUpdate(() => {
  camPos(player.pos)
})
const DELIVERER_SPEED = 120; // pixel per sec

// Deliverer movements
const releaseMovement = (animationName) => {
  if (!isKeyDown("left") && !isKeyDown("right") && !isKeyDown("up") && !isKeyDown("down")) {
    player.play(animationName)
  }
}
onKeyPress("right", () => player.play("right"));
onKeyDown("right", () => player.move(DELIVERER_SPEED, 0))
onKeyRelease("right", () => releaseMovement("idle_right"));

onKeyPress("left", () => player.play("left"));
onKeyDown("left", () => player.move(-DELIVERER_SPEED, 0))
onKeyRelease("left", () => releaseMovement("idle_left"));

onKeyPress("up", () => player.play("top"));
onKeyDown("up", () => player.move(0, -DELIVERER_SPEED))
onKeyRelease("up", () => releaseMovement("idle_top"));

onKeyPress("down", () => player.play("bottom"));
onKeyDown("down", () => player.move(0, DELIVERER_SPEED))
onKeyRelease("down", () => releaseMovement("idle_bottom"));

// List of all current orders
const orders = []
// Create order dialog
const orderDialog = addDialog()

wait(3, () => {
  // Create new order every 10 seconds
  loop(10, () => {
    // Create order
    const order = generateOrder()

    // Add order to the queue
    orders.push(order)

    // Update dialog with hint
    orderDialog.show(order.deliveryLocation.hint)
  })
})

