'use strict';

export default function keyMove(deliverSpeed, globalHelper) {

    const keysRight = ["right", "d"];
    const keysLeft = ["left", "q", "a"];
    const keysUp = ["up", "z", "w"];
    const keysDown = ["down", "s"];

    return {
        id: 'move',
        require: ['pos', 'sprite'],

        goLeft: false,
        goRight: false,
        goUp: false,
        goDown: false,

        update() {
            if (this.goLeft) this.moveAtSpeed(-deliverSpeed, 0)
            if (this.goRight) this.moveAtSpeed(deliverSpeed, 0)
            if (this.goUp) this.moveAtSpeed(0, -deliverSpeed)
            if (this.goDown) this.moveAtSpeed(0, deliverSpeed)
        },

        moveAtSpeed(x, y) {
            this.move(x, y);
            globalHelper.processMove(this);
        },

        stopMove(stopAnimationName, propertyName, keys) {
            // Do not stop animation if another key with same direction is pressed
            if (!keys.some(key => isKeyDown(key))) {
                // Change property go...
                this[propertyName] = false;
                if (!this.goLeft && !this.goRight && !this.goUp && !this.goDown) {
                    this.play(stopAnimationName);
                }
            }
        },

        add() {
            //// Animations

            // RIGHT
            onKeyPress(keysRight, () => {
                this.goRight = true;
                this.play("right")
            });
            onKeyRelease(keysRight, () => this.stopMove("idle_right", "goRight", keysRight));

            // LEFT
            onKeyPress(keysLeft, () => {
                this.goLeft = true;
                this.play("left")
            });
            onKeyRelease(keysLeft, () => this.stopMove("idle_left", "goLeft", keysLeft));

            // UP
            onKeyPress(keysUp, () => {
                this.goUp = true;
                this.play("top")
            });
            onKeyRelease(keysUp, () => this.stopMove("idle_top", "goUp", keysUp));

            // DOWN
            onKeyPress(keysDown, () => {
                this.goDown = true;
                this.play("bottom")
            });
            onKeyRelease(keysDown, () => this.stopMove("idle_bottom", "goDown", keysDown));

        }
    };
}