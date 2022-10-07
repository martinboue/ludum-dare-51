
export function addTutorial() {
    const tutoImg = add([
        sprite("tutorial"),
        z(2000),
        scale(0.12),
        fixed(),
        origin("center"),
        pos(center())
    ])

    const tutorial = {
        show() {
            tutoImg.hidden = false;
        },

        hide() {
            tutoImg.hidden = true;
        },

        toggle() {
            tutoImg.hidden = !tutoImg.hidden;
        }
    }
    onKeyPress("h", () => {
        tutorial.toggle()
    })

    // FIXME
    tutorial.hide()

    return tutorial;
}