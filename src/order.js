import "./utils/array.js";
import foodList from "./data/food.json";
import {identityFilters, uniqueIdentityFilter} from "./identityFilters.js";

export function addDialog() {
    const containerMarginX = 10;
    const containerPaddingX = 7;

    // Create order dialog
    const container = add([
        rect(width() - containerMarginX * 2, 30),
        origin("center"),
        pos(center().x, height() - 20),
        outline(2),
        z(100)
    ]);

    // Create food image
    const food = add([
        sprite(foodList[0].code),
        area({ width: 16, height: 16 }),
        pos(containerMarginX + containerPaddingX, container.pos.y),
        origin("left"),
        z(100)
    ]);

    // Create dialog text
    const txt = add([
        text("", { size: 6, width: container.width - containerPaddingX * 3 - food.area.width }),
        pos(containerMarginX + containerPaddingX * 2 + food.area.width, container.pos.y),
        color(0, 0, 0),
        origin("left"),
        z(100)
    ]);


    // Hide by default
    container.hidden = true;
    txt.hidden = true;
    food.hidden = true;

    // Fix for camera
    container.fixed = true;
    txt.fixed = true;
    food.fixed = true;

    return {

        show(sprite, message, timeout= 5) {
            txt.text = message;

            // Update food sprite
            food.use(sprite);

            // Show dialog container and text
            container.hidden = false;
            txt.hidden = false;
            food.hidden = false;

            // Hide dialog after x seconds
            wait(timeout, () => {
                this.dismiss();
            });
        },

        showSms(author, message) {
            this.show(sprite('phone'), `${author}: ${message}`);
        },

        showOrder(order) {
            this.show(sprite(order.food.code), order.deliveryInfo.hint);
        },

        showNoOrder() {
            this.show(sprite('phone'), 'No order', 2);
        },

        dismiss() {
            // Reset dialog text
            txt.text = "";
            // Hide dialog container and text
            container.hidden = true;
            txt.hidden = true;
            food.hidden = true;
        },
        destroy() {
            container.destroy();
            txt.destroy();
            food.destroy();
        }

    };
}

export function generateOrder(npcList) {
    // Choose random food
    const food = foodList.pickRandom();

    // Generate a pick up location
    const pickUpLocation = {
        pos: { x: 10, y: 10 }
    };

    // Select a NPC client
    const client = npcList.pickRandom();

    // Generate hint to target this client
    const deliveryInfo = {
        hint: generateHints(client, npcList).join(" "),
        client: client
    };

    // Create order
    return {
        food: food,
        pickUpLocation: pickUpLocation,
        deliveryInfo: deliveryInfo,
    };
}

function generateHints(client, npcs) {
    const remainingFilters = [...identityFilters].shuffle();

    let selectedFilters = [];

    // As long as the filters used do not target ONLY the client
    while (applyFilterList(client, npcs, selectedFilters).length > 1) {
        // Choose a filter randomly
        const filter = remainingFilters.pop();

        if (filter) {
            // Add filter to list of selected
            selectedFilters.push(filter)
        } else {
            // Use unique filter instead
            selectedFilters = [uniqueIdentityFilter]
        }
    }

    // Convert all selected filters to readable hints
    return selectedFilters.map(filter => {
        // Each filter has many functions to translate to readable hint
        // We choose one randomly
        const textFn = filter.textsFn.pickRandom();
        return textFn(client)
    });
}

function applyFilterList(client, npcs, filters) {
    return npcs.filter(npc => {
        return filters.every(filter => filter.filterFn(client)(npc))
    })
}