import {
    toReadableHatType,
} from "./utils/readable.js";

export const uniqueIdentityFilter = {
    filterName: "name",
    filterFn: (clientNpc) => (npc) => npc.identity.name === clientNpc.identity.name,
    textsFn: [
        (clientNpc) => `His name is ${ clientNpc.identity.name }.`
    ]
};

/**
 * Filters to compare if there is another NPC with the same attribute as the chosen client NPC
 */
export const identityFilters = [

    //// IDENTITY
    {
        filterName: "nameStartsWith",
        filterFn: (clientNpc) => (npc) => npc.identity.name.startsWith(clientNpc.identity.name[0]),
        textsFn: [
            (clientNpc) => `His name starts with "${ clientNpc.identity.name[0] }".`
        ]
    },

    //// SKIN
    // Outfit
    {
        filterName: "skinTopColor",
        filterFn: (clientNpc) => (npc) => npc.identity.skin.top === clientNpc.identity.skin.top,
        textsFn: [
            (clientNpc) => `His T-shirt is ${ clientNpc.identity.skin.top }.`
        ]
    },
    {
        filterName: "skinBottomColor",
        filterFn: (clientNpc) => (npc) => npc.identity.skin.bottom === clientNpc.identity.skin.bottom,
        textsFn: [
            (clientNpc) => `His trousers are ${ clientNpc.identity.skin.bottom }.`
        ]
    },

    // Hair
    {
        filterName: "skinHairType",
        filterFn: (clientNpc) => (npc) => npc.identity.skin.hair?.type === clientNpc.identity.skin.hair?.type,
        textsFn: [
            (clientNpc) => clientNpc.identity.skin.hair?.type ? `He has ${ clientNpc.identity.skin.hair.type } hair.` : `He is bald.`
        ]
    },
    {
        filterName: "skinHairColor",
        filterFn: (clientNpc) => (npc) => npc.identity.skin.hair?.color === clientNpc.identity.skin.hair?.color,
        textsFn: [
            (clientNpc) => clientNpc.identity.skin.hair?.color ? `He has ${ clientNpc.identity.skin.hair.color } hair.` : `He is bald.`
        ]
    }
];
