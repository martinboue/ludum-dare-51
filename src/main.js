import kaboom from "kaboom";

// Assets
import atlas from "../assets/Spritesheet/roguelikeCity_magenta.png";
import backgroundSprite from "../assets/Spritesheet/map.png";

kaboom({scale: 4});

loadBean();
loadSprite("background", backgroundSprite);

loadSpriteAtlas(atlas, {
  "road_top": {
    "x": 0,
    "y": 0,
    "width": 16,
    "height": 16,
  }
});

const background = add([
  sprite('background'),
]);

const map = addLevel([
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "##########     #######################################################",
  "                                                                      ",
  "                                                                      ",
  "                                                                      ",
  "                                                                      ",
  "                                                                      ",
  "##########     #######################################################",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
  "         #     #                                                      ",
], {
  width: 16,
  height: 16,
  "#": () => [
      area({width: 16, height: 16}),
      solid(),
  ]
});