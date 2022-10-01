'use strict';

export default function talk(deliverer, options={ width: 100, offset: {x: 0, y: -8} }) {

    let txt;

    return {
        id: 'talk',
        require: ['pos', 'area'],
        add() {

            // Create text
            txt = add([
                text("", { size: 6, width: options.width }),
                origin("bot"),
                pos(this.pos.x + options.offset.x, this.pos.y + options.offset.y),
                color(255, 255, 0),
                z(90),
            ]);
            txt.hidden = true;
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