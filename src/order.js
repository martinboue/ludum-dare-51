import "./utils/array.js";
import foodList from "./data/food.json";
import {identityFilters, uniqueIdentityFilter} from "./identityFilters.js";

export function generateOrder(npcs, deliveryDelay) {
    // Choose random food
    const food = foodList.pickRandom();

    // Select a NPC client
    const client = npcs.pickRandom();

    // Generate hint to target this client
    const hints = generateHints(client, npcs)
    let hintPhrase = "This is for the guy with ";
    if (hints.length > 1) {
        hintPhrase += hints.slice(0, -1).join(", ") + " and ";
    }
    hintPhrase += hints[hints.length - 1] + ".";

    const deliveryInfo = {
        hint: hintPhrase,
        client: client
    };

    // Create order
    return {
        food: food,
        deliveryInfo: deliveryInfo,
        deliveryDelay: deliveryDelay,
        expireAt: time(),
        resetExpiration() {
            this.expireAt = time() + deliveryDelay;
        },
        getRemainingTime() {
            return Math.floor(this.expireAt - time());
        },
        isExpired() {
            return this.getRemainingTime() < 0;
        }
    };
}

function generateHints(client, npcs) {
    const remainingFilters = [...identityFilters].shuffle();

    let selectedFilters = [];

    // As long as the filters used do not target ONLY the client
    while (selectedFilters.length < 1 || filtersMatch(client, npcs, selectedFilters)) {
        // Choose a filter randomly
        const filter = remainingFilters.pop();

        if (filter) {
            // Add filter to list of selected
            selectedFilters.push(filter);
        } else {
            // Use unique filter instead
            selectedFilters = [uniqueIdentityFilter];
        }
    }

    // Convert all selected filters to readable hints
    return selectedFilters.map(filter => {
        // Each filter has many functions to translate to readable hint
        // We choose one randomly
        const textFn = filter.textsFn.pickRandom();
        return textFn(client);
    });
}

function filtersMatch(client, npcs, filters) {
    return npcs.filter(npc => filters.every(filter => filter.filterFn(client)(npc))).length > 1;
}

export function addOrderItem(order, index) {
    const margin = 10;

    return add([
        sprite(order.food.code),
        pos(index * 16 + (index + 1) * margin, margin),
        z(100),
        fixed(),
        origin('center'),
        'orderItem',
        {
            update() {
                if (order.isExpired()) {
                    destroy(this);
                    this.trigger('order-expired', order);
                }
            },

            draw() {
                // Hint: we don't use comp text to be able to use different color for text
                const time = order.getRemainingTime()

                drawText({
                    text: time,
                    font: "sink",
                    pos: vec2(0, 14),
                    origin: "center",
                    fixed: true,
                    color: time > 10 ? WHITE : RED,
                });
            },
        },
    ]);
}

export function addOrderMiss(order, index) {
    const margin = 10;

    return add([
        sprite('cross'),
        pos(index * 8 + (index + 1) * margin, height() - margin),
        z(100),
        fixed(),
        origin('center'),
        'orderMiss',
    ]);
}