export function elasped(timeout, onEach, onRestart = () => {}, autostart=true) {

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
                onEach = onEach.bind(this);
                onEach();
            }
        },

        restart() {
            isStarted = true;
            lastStart = time();

            onRestart = onRestart.bind(this);
            onRestart();
        },

        stop() {
            isStarted = false;
        }
    };
}