
export function addScore() {

    const getScoreText = (score) => 'Score: ' + score;

    const computerOrderScore = (order) => {
        if (order.getRemainingTime() <= 0) {
            return 0;
        } else if (order.getRemainingTime() < order.deliveryDelay/2) {
            return 50;
        }
        return 100;
    };

    return add([
        text(getScoreText(0), { size: 10, font: "sinko" }),
        pos(center().x, 14),
        fixed(),
        origin("center"),
        {
            score: 0,
            addScoreForOrder(order) {
                const points = computerOrderScore(order);
                this.updateScore(points);

                return points;
            },
            decreaseScore(points) {
                this.updateScore(-points)
            },
            updateScore(points) {
                this.score += points
                this.text = getScoreText(this.score);
            }
        }
    ]);
}

export function showPoints(points, deliverer) {

    return add([
        text((points >= 0 ? '+' : '') + points, {size: 6}),
        pos(vec2(deliverer.pos.x, deliverer.pos.y - 10)),
        color(points >= 0 ? rgb(255, 215, 0) : rgb(200, 0, 0)),
        origin("center"),
        opacity(1),
        {
            update() {
                this.move(0, -5);
                this.opacity -= 0.005;
                if (this.opacity < 0) {
                    destroy(this);
                }
            }
        },
        z(110),
    ]);
}