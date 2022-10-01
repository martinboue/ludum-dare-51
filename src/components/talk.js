'use strict';

export default function talk(deliverer) {

    let txt;

    return {
        id: 'talk',
        require: ['pos', 'area', 'identity'],
        add() {
            // Create text
            txt = add([
                text("", { size: 5, width: 100 }),
                origin("bot"),
                pos(this.pos.x, this.pos.y - 8),
                z(91),
            ]);
            txt.hidden = true;

            this.onCollide("deliverer", () => {
                const message = this.presentation()
                this.say(message);
            });
        },

        destroy() {
            txt.destroy();
        },

        say(message, timeout = 1) {
            txt.hidden = false;
            txt.text = message;

            this.dismiss(timeout)
        },

        dismiss(timeout) {
            wait(timeout, () => {
                if (!this.isTouching(deliverer)) {
                    txt.hidden = true;
                } else {
                    this.dismiss(timeout);
                }
            });
        }

    };
}