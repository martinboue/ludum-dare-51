export function orderHolder(max) {
    let orders = [];

    return {
        id: 'orderHolder',
        require: [],

        inspect() {
            return `orders: ${orders.length}`;
        },

        pushOrder(order) {
            if (this.isFull()) throw new Error("Max order reach");
            orders.push(order);
            this.trigger('push-order', order);
        },

        // Return and remove first
        pollOrder() {
            const head = orders.head();
            orders = orders.tail();

            return head;
        },

        // Return first
        peekOrder() {
            return orders.head();
        },

        getOrders() {
            return orders;
        },

        getMax() {
            return max;
        },

        isFull() {
            return orders.length >= max;
        },

        onPushOrder(cb) {
            this.on('push-order', cb);
        }
    };
}