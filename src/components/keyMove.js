'use strict';

export default function keyMove(deliverSpeed) {
    return {
        id: 'move',
        require: ['pos', 'sprite'],
        add() {
            // Deliverer movements
            const releaseMovement = (animationName) => {
                if (!isKeyDown("left") && !isKeyDown("right") && !isKeyDown("up") && !isKeyDown("down")) {
                    this.play(animationName);
                }
            };
            const keysRight = ["right", "d"]
            onKeyPress(keysRight, () => this.play("right"));
            onKeyDown(keysRight, () => this.move(deliverSpeed, 0));
            onKeyRelease(keysRight, () => releaseMovement("idle_right"));

            const keysLeft = ["left", "q", "a"]
            onKeyPress(keysLeft, () => this.play("left"));
            onKeyDown(keysLeft, () => this.move(-deliverSpeed, 0));
            onKeyRelease(keysLeft, () => releaseMovement("idle_left"));

            const keysUp = ["up", "z", "w"]
            onKeyPress(keysUp, () => this.play("top"));
            onKeyDown(keysUp, () => this.move(0, -deliverSpeed));
            onKeyRelease(keysUp, () => releaseMovement("idle_top"));

            const keysDown = ["down", "s"]
            onKeyPress(keysDown, () => this.play("bottom"));
            onKeyDown(keysDown, () => this.move(0, deliverSpeed));
            onKeyRelease(keysDown, () => releaseMovement("idle_bottom"));
        }
    };
}