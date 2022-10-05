export function addGlobalDialog() {
    const containerMarginX = 10;
    const containerPaddingX = 7;

    // Create order dialog
    const container = add([
        rect(width() - containerMarginX * 2, 30),
        origin("center"),
        pos(center().x, height() - 20),
        outline(2),
        z(100)
    ]);

    // Create food image
    const image = add([
        sprite('phone'),
        area({ width: 16, height: 16 }),
        pos(containerMarginX + containerPaddingX, container.pos.y),
        origin("left"),
        z(100)
    ]);

    // Create dialog text
    const txt = add([
        text("", { size: 6, width: container.width - containerPaddingX * 3 - image.area.width }),
        pos(containerMarginX + containerPaddingX * 2 + image.area.width, container.pos.y),
        color(0, 0, 0),
        origin("left"),
        z(100)
    ]);


    // Hide by default
    container.hidden = true;
    txt.hidden = true;
    image.hidden = true;

    // Fix for camera
    container.fixed = true;
    txt.fixed = true;
    image.fixed = true;

    return {

        show(author, message, timeout=5) {
            txt.text = `${author}: ${message}`;

            // Update food sprite
            image.use(sprite('phone'));

            // Show dialog container and text
            container.hidden = false;
            txt.hidden = false;
            image.hidden = false;

            // Hide dialog after x seconds
            wait(timeout, () => {
                this.dismiss();
            });
        },

        dismiss() {
            // Reset dialog text
            txt.text = "";
            // Hide dialog container and text
            container.hidden = true;
            txt.hidden = true;
            image.hidden = true;
        },

        destroy() {
            container.destroy();
            txt.destroy();
            image.destroy();
        }
    };
}
