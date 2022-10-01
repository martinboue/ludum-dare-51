'use strict';

export default function talk(defaultMessage) {

    let txt;

    return {
        id: 'talk',
        require: ['pos', 'area', 'identity'],
        add() {
            // Create text
            txt = add([
                text(defaultMessage, { size: 5 }),
                origin("center"),
                pos(this.pos.x, this.pos.y - 16 - 2),
                z(91),
            ]);
            txt.hidden = true;

            this.onCollide("deliverer", () => {
                this.say(defaultMessage);
            });
        },

        destroy() {
            txt.destroy();
        },

        say(message, timeout=2) {
            txt.hidden = false;
            txt.text = message;
            wait(timeout, () => {
                txt.hidden = true;
            });
        }
    };
}