
/**
 * Filters to compare if there is another NPC with the same attribute as the chosen client NPC
 */
export const identityFilters = [

    //// SKIN
    // Outfit
    {
        filterName: "skinTopColor",
        filterFn: (clientNpc) => (npc) => npc.identity.skin.top === clientNpc.identity.skin.top,
        getColor: (clientNpc) => clientNpc.identity.skin.top,
        getText: (clientNpc) => `a ${ clientNpc.identity.skin.top } T-shirt`
    },
    {
        filterName: "skinBottomColor",
        filterFn: (clientNpc) => (npc) => npc.identity.skin.bottom === clientNpc.identity.skin.bottom,
        getColor: (clientNpc) => clientNpc.identity.skin.bottom,
        getText: (clientNpc) => `${ clientNpc.identity.skin.bottom } trousers`
    },

    // Hair
    {
        filterName: "skinHair",
        filterFn: (clientNpc) => (npc) => npc.identity.skin.hair?.type === clientNpc.identity.skin.hair?.type
            && npc.identity.skin.hair?.color === clientNpc.identity.skin.hair?.color,
        getColor: (clientNpc) => clientNpc.identity.skin.hair?.color,
        getText: (clientNpc) => clientNpc.identity.skin.hair ? `${ clientNpc.identity.skin.hair.type } ${ clientNpc.identity.skin.hair.color } hair` : `no hair`
    }
];
