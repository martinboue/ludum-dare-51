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
            onKeyPress("right", () => this.play("right"));
            onKeyDown("right", () => this.move(deliverSpeed, 0));
            onKeyRelease("right", () => releaseMovement("idle_right"));

            onKeyPress("left", () => this.play("left"));
            onKeyDown("left", () => this.move(-deliverSpeed, 0));
            onKeyRelease("left", () => releaseMovement("idle_left"));

            onKeyPress("up", () => this.play("top"));
            onKeyDown("up", () => this.move(0, -deliverSpeed));
            onKeyRelease("up", () => releaseMovement("idle_top"));

            onKeyPress("down", () => this.play("bottom"));
            onKeyDown("down", () => this.move(0, deliverSpeed));
            onKeyRelease("down", () => releaseMovement("idle_bottom"));
        }
    };
}