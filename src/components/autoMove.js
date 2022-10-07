

export function autoMove(frameNames) {

    let lastMove = 0;
    let nextMove = 0;

    return {
        id: "autoMove",
        required: ["sprite"],

        update() {
            if (time() > nextMove) {
                this.randomMove()
            }
        },

        randomMove() {
            lastMove = time()

            // Generate the next move date
            nextMove = lastMove + Math.randomFloatBetween(1, 5);

            // Choose random position until it's different from previous
            let nextFrame = null;
            while (nextFrame == null || nextFrame === this.frame) {
                nextFrame = Math.randomBetween(0, frameNames.length - 1)
            }

            // Change sprites
            this.frame = nextFrame;
        }
    }
}