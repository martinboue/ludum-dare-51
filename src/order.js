import "./utils/array.js";
import foodList from "./data/food.json";
import {identityFilters} from "./identityFilters.js";

export function generateOrder(npcs, deliveryDelay) {
    // Choose random food
    const food = foodList.pickRandom();

    // Select a NPC client
    const client = npcs.pickRandom();

    // Choose hint type : name or skin
    const useName = Math.randomBoolean();
    let hintPhrase;

    if (useName) {
        hintPhrase = "[This is for].black [" + client.identity.name + "].red.";
    } else {
        // Generate hint to target this client
        const hints = generateHints(client, npcs)
        hintPhrase = "[This is for the client with].black ";
        if (hints.length > 1) {
            hintPhrase += hints
                .map(h => "[" + h.getText(client) + "]." + h.getColor(client))
                .slice(0, -1)
                .join(", ")
                + " [and].black ";
        }
        const lastHint = hints[hints.length - 1];
        hintPhrase += "[" + lastHint.getText(client) + "]." + lastHint.getColor(client);
    }

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
            console.warn(client, npcs);
            throw new Error("The skin is not unique among the NPC.");
        }
    }

    // Convert all selected filters to readable hints
    return selectedFilters
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
        z(95),
        fixed(),
        origin('center'),
        'orderMiss',
    ]);
}