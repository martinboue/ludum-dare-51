import kaboom from "kaboom";

// Assets
import ghosty from "../assets/ghosty.png";

kaboom();

loadBean();
loadSprite("ghosty", ghosty);

const player = add([
  sprite("bean"),   
  pos(120, 80),
  rotate(0),
  area(),
  body(),
  origin("center"),
  "player",
]);

add([
  rect(width(), 50),
  pos(0, height() - 50),
  area(),
  solid(),
  color(125, 125, 125)
]);