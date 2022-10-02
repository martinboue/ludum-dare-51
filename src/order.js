import "./utils/array.js";
import foodList from "./data/food.json";
import {identityFilters, uniqueIdentityFilter} from "./identityFilters.js";

export function generateOrder(npcs) {
    // Choose random food
    const food = foodList.pickRandom();

    // Select a NPC client
    const client = npcs.pickRandom();

    // Generate hint to target this client
    const deliveryInfo = {
        hint: generateHints(client, npcs).join(" "),
        client: client
    };

    // Create order
    return {
        food: food,
        deliveryInfo: deliveryInfo,
    };
}

function generateHints(client, npcs) {
    const remainingFilters = [...identityFilters].shuffle();

    let selectedFilters = [];

    // As long as the filters used do not target ONLY the client
    while (filtersMatch(client, npcs, selectedFilters)) {
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

function filtersMatch(client, npcs, filters) {
    return npcs.filter(npc => filters.every(filter => filter.filterFn(client)(npc))).length > 1;
}