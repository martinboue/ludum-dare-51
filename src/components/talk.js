'use strict';

export default function talk(msg) {

    let txt;

    return {
        id: 'talk',
        require: ['pos', 'area', 'identity'],
        add() {
            // Create text
            txt = add([
                text(msg, { size: 5 }),
                origin("center"),
                pos(this.pos.x, this.pos.y - 16 - 2),
                z(91),
            ])
            txt.hidden = true;

            this.onCollide("deliverer", () => {
                txt.hidden = false;
            })
        },
        destroy() {
            txt.destroy()
        }
    }
}