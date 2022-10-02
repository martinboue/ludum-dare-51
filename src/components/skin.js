import skins from "../data/skins.json"

export function skin(hairFrame, topFrame, bottomFrame) {

    const nbHair = skins.hair.length;
    const nbTop = skins.top.length;
    const nbBottom = skins.bottom.length;

    return {
        id: "skin",
        required: ['pos', 'autoMove'],
        draw() {
            // Get direction in order : left=0, bottom=1, top=2, right=3
            const direction = this.frame;

            drawSprite({
                sprite: "bottom",
                frame: bottomFrame + nbBottom * direction,
                origin: "center"
            });
            drawSprite({
                sprite: "top",
                frame: topFrame + nbTop * direction,
                origin: "center"
            });
            drawSprite({
                sprite: "hair",
                frame: hairFrame + nbHair * direction,
                origin: "center"
            });
        }
    };
}