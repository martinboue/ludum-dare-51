'use strict';

import level0Background from "../assets/sprites/map.png";

/*
NOTICE :
# = "wall"
B = NOTHING, just to visualize buildings
. = empty space (easier to visualize compare to space " ")
 */

// Map sprite size : width=52, height=45 + 1 for frame
export const levels = [[
    "######################################################",
    "#......................#####..................######.#",
    "#............#####.....#...#.o...BBBBBBBB.....#....#.#",
    "#...BBBBBB...#...#######...#...o.BBBBBBBB.###.#....#.#",
    "#...BBBBBB...#.............#.....BBBBBBBB..oo.#....#.#",
    "#...BBBBBBo..#.............#....oBBBBBBBB.....#....#.#",
    "#...BBBBBB...#.............#o....BBBBBBBB....o#....#.#",
    "#.o.BBBBBB...#........######.....BBBBBBBB.....#....#.#",
    "#...BBBBBB.o.##########..........BBBBBBBB....o#....#.#",
    "#..#BBBBBB....o.o...oo.o..o......BBBBBBBB#....#....#.#",
    "#...##.o.o.#......................o.o....o....#....#.#",
    "#.#.o......#..................................#....#.#",
    "#.o..o.oo..#.............###..................######.#",
    "#...#####.......o.......#o.o...................oo....#",
    "#...#...##....########......o....................o...#",
    "#...#####o....#......#...o........o....#######.o...o.#",
    "#.#..oo.o..#o.#......#BBBBB......####.##.....#...o...#",
    "#.............#.......BBBBB......#.....#.....#....o..#",
    "#.o....########.......BBBBBo.....#.o...#.....#.###...#",
    "#.....##..............BBBBB.....o#######.....#.......#",
    "#..o...#..............BBBBB......#...........#.......#",
    "#......#..............BBBBB......#...........#....o#.#",
    "#....o.#..............BBBBB......#...........#....o#.#",
    "#.o....########.......BBBBBo....o#....########.......#",
    "#.....#.o....o#########o.........######.oo.o.........#",
    "#.....o.....#.##....ooo.x.#.......o.oo......o........#",
    "#........#o....o..o........o......................o..#",
    "#....................................................#",
    "#....................................................#",
    "#....................................................#",
    "#.o......o...o....o........................o.......o.#",
    "#...........########...........o#.#o..oBBBBBB........#",
    "#......BBBBB#......#.o............o....BBBBBB......o.#",
    "#o.....BBBBB.......#......#.#....#.#...BBBBBBo.......#",
    "#......BBBBB.......#.#....#o........###BBBBBB....o...#",
    "#......BBBBB.......#......#....o....#o#BBBBBB........#",
    "#.....oBBBBB.......#.....o##.#...o....oBBBBBB.....o..#",
    "#......BBBBB########.o....#..o.........BBBBBB........#",
    "#.o....BBBBB#...o###..........o.....#..BBBBBB....###.#",
    "#......p..o..o....oo......o.......o....o.o........o..#",
    "#.............o.............................o........#",
    "#...................................................##",
    "#...................................................##",
    "##..................................................##",
    "#o......#....o............#.o............#........o..#",
    "######################################################",
]];

export const levelBackgrounds = [
    level0Background
];