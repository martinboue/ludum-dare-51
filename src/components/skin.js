

export function skin(hairFrame, topFrame, bottomFrame) {
    return {
        id: "skin",
        required: ['pos'],
        draw() {
            drawSprite({
                sprite: "bottom",
                frame: bottomFrame,
                origin: "center"
            })
            drawSprite({
                sprite: "top",
                frame: topFrame,
                origin: "center"
            })
            drawSprite({
                sprite: "hair",
                frame: hairFrame,
                origin: "center"
            })
        }
    }
}