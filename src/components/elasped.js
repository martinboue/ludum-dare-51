export function elasped(timeout, action, autostart=true) {

    let lastStart = null;
    let isStarted = false;

    return {
        id: 'elasped',
        add() {
            autostart && this.restart();
        },

        update() {
            if (!isStarted) return;
            const now = time();

            if (now - lastStart >= timeout) {
                lastStart = now;
                action = action.bind(this);
                action();
            }
        },

        restart() {
            isStarted = true;
            lastStart = time();
        },

        stop() {
            isStarted = false;
        }
    };
}