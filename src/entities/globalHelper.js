export function addGlobalHelper() {
    const icon = add([
        sprite("input_space"),
        fixed(),
        pos(center().x, height() - 20),
        origin("center"),
        z(50)
    ])
    const txt = add([
        text("", { size: 5 }),
        fixed(),
        pos(center().x, height() - 20),
        origin("left"),
        z(50)
    ])
    icon.hidden = true;
    txt.hidden = true;

    let entity = null;

    return {
        processMove(deliverer) {
            // Detect leave collision with deliverer only if necessary
            if (!icon.hidden && entity) {
                // Hide helper if is no longer touching
                if (!deliverer.isTouching(entity)) {
                    this.hide();
                }
            }
        },

        show(iconSprite, message, e) {
            // Update helper
            icon.use(sprite(iconSprite));
            txt.text = message;
            txt.pos.x = center().x + icon.width / 2 + 2

            // Show helper
            icon.hidden = false;
            txt.hidden = false;

            // Store entity for leave collide detection
            entity = e;
        },

        hide() {
            // Hide helper
            icon.hidden = true;
            txt.hidden = true;
        }
    }
}