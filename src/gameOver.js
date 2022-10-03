export function addGameOver() {
    return add([
        text('Game Over!', { size: 10, font: "sinko" }),
        pos(center().x, center().y - 30),
        origin('center'),
        color(RED),
        fixed(),
    ]);
}