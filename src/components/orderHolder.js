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
            this.trigger('poll-order', [head]);
            return head;
        },

        // Return first
        peekOrder() {
            return orders.head();
        },

        getOrders() {
            return orders;
        },

        // Return all orders for the specified npc and remove it from current holder.
        popOrdersFor(npc) {
            const [forNpcOrders, otherOrders] = Array.partition(orders, o => o.deliveryInfo.client._id === npc._id);
            orders = otherOrders;

            this.trigger('poll-order', otherOrders);

            return forNpcOrders;
        },

        getMax() {
            return max;
        },

        isFull() {
            return orders.length >= max;
        },

        onPushOrder(cb) {
            this.on('push-order', cb);
        },

        onPollOrder(cb) {
            this.on('poll-order', cb);
        }
    };
}