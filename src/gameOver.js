export function addGameOver() {
    return add([
        text('You are fired!', { size: 10, font: "sinko" }),
        pos(center().x, center().y - 30),
        origin('center'),
        color(RED),
        fixed(),
    ]);
}