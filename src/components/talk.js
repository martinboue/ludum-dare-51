'use strict';

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
                    styles: {
                        black: { color: rgb(0, 0, 0) },
                        red: { color: rgb(255, 80, 77) },
                        green: { color: rgb(66, 163, 121) },
                        blue: { color: rgb(99, 155, 255) },
                        yellow: { color: rgb(245, 182, 76) },
                        pink: { color: rgb(229, 139, 199) },
                        white: { color: rgb(203, 202, 174) },
                        brown: { color: rgb(141, 82, 67) },
                        grey: { color: rgb(92, 98, 120) }
                    }
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