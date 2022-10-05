
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
            tutorial.hidden = false;
        },

        hide() {
            tutorial.hidden = true;
        },

        toggle() {
            tutoImg.hidden = !tutoImg.hidden;
        }
    }
    onKeyPress("h", () => {
        tutorial.toggle()
    })

    return tutorial;
}