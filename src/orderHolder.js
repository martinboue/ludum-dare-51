export function orderHolder() {
    let orders = [];

    return {
        id: 'orderHolder',
        require: [],
        add() {

        },

        inspect() {
            return `orders: ${orders.length}`;
        },

        pushOrder(order) {
            orders.push(order);
            this.trigger('push-order', order);
        },

        pollOrder() {
            const head = orders.head();
            orders = orders.tail();

            return head;
        },

        onPushOrder(cb) {
            this.on('push-order', cb);
        }
    }
}