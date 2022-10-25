'use strict';
import getTextStyle from "../textStyle.js";

export default function talk(deliverer, options = { width: 100, offset: {x: 0, y: -20} }) {

    let txt;
    let box;

    return {
        id: 'talk',
        require: ['pos', 'area'],
        add() {
            // Create container
            const padding = 4;
            box = add([
                rect(options.width, 20),
                pos(this.pos.x + options.offset.x, this.pos.y + options.offset.y),
                origin("center"),
                color(255, 255, 255),
                outline(1),
                z(90),
            ])
            box.hidden = true;

            // Create text
            txt = add([
                text("", {
                    size: 6,
                    width: options.width - padding * 2,
                    styles: getTextStyle()
                }),
                origin("center"),
                pos(box.pos.x, box.pos.y),
                z(90),
            ]);
            txt.hidden = true;
        },

        destroy() {
            txt.destroy();
            box.destroy();
        },

        say(message, timeout = 1) {
            txt.hidden = false;
            box.hidden = false;
            txt.text = message;

            this.dismiss(timeout);
        },

        dismiss(timeout) {
            wait(timeout, () => {
                if (!this.isTouching(deliverer)) {
                    txt.hidden = true;
                    box.hidden = true;
                } else {
                    this.dismiss(timeout);
                }
            });
        }

    };
}