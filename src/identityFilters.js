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

    //// Identity
    {
        filterName: "nameStartsWith",
        filterFn: (clientNpc) => (npc) => npc.identity.name.startsWith(clientNpc.identity.name[0]),
        textsFn: [
            (clientNpc) => `His name starts with "${ clientNpc.identity.name[0] }".`
        ]
    },

    //// Character
    // Gender
    {
        filterName: "characterGender",
        filterFn: (clientNpc) => (npc) => npc.identity.character.gender === clientNpc.identity.character.gender,
        textsFn: [
            (clientNpc) => clientNpc.identity.character.gender === "female" ? "She is a woman." : "He is a man."
        ]
    },

    // Outfit
    {
        filterName: "characterOutfitTopColor",
        filterFn: (clientNpc) => (npc) => npc.identity.character.outfit.topColor === clientNpc.identity.character.outfit.topColor,
        textsFn: [
            (clientNpc) => `His T-shirt is ${ clientNpc.identity.character.outfit.topColor }.`
        ]
    },
    {
        filterName: "characterOutfitBottomColor",
        filterFn: (clientNpc) => (npc) => npc.identity.character.outfit.bottomColor === clientNpc.identity.character.outfit.bottomColor,
        textsFn: [
            (clientNpc) => `His trousers are ${ clientNpc.identity.character.outfit.bottomColor }.`
        ]
    },

    // Hat
    {
        filterName: "characterOutfitHatType",
        filterFn: (clientNpc) => (npc) => npc.identity.character.outfit.hat?.type === clientNpc.identity.character.outfit.hat?.type,
        textsFn: [
            (clientNpc) => `He has ${ toReadableHatType(clientNpc.identity.character.outfit.hat?.type) }.`
        ]
    },

    // Hair
    {
        filterName: "characterHairType",
        filterFn: (clientNpc) => (npc) => npc.identity.character.hair?.type === clientNpc.identity.character.hair?.type,
        textsFn: [
            (clientNpc) => clientNpc.identity.character.hair?.type ? `He has ${ clientNpc.identity.character.hair.type } hair.` : `He is bald.`
        ]
    },
    {
        filterName: "characterHairColor",
        filterFn: (clientNpc) => (npc) => npc.identity.character.hair?.color === clientNpc.identity.character.hair?.color,
        textsFn: [
            (clientNpc) => clientNpc.identity.character.hair?.color ? `He has ${ clientNpc.identity.character.hair.color } hair.` : `He is bald.`
        ]
    }
];
