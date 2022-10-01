import {
    toReadableAgeCategory,
    toReadableDate,
    toReadableHatType,
    toReadableMonth,
    toReadableOutfitType
} from "./utils/readable.js";

const getAge = (birthDate) => {
    const msDiff = Date.now() - birthDate;
    const ageDelta = new Date(msDiff);
    return Math.abs(ageDelta.getUTCFullYear() - 1970);
}

const betweenInclusive = (value, min, max) => min <= value && value <= max;

const getFullName = (npc) => `${npc.identity.firstName} ${npc.identity.lastName}`;

export const uniqueIdentityFilter = {
    filterName: "fullName",
    filterFn: (clientNpc) => (npc) => {
        return getFullName(npc) === getFullName(clientNpc)
    },
    textsFn: [
        (clientNpc) => `His name is ${ getFullName(clientNpc) }.`
    ]
}

/**
 * Filters to compare if there is another NPC with the same attribute as the chosen client NPC
 */
export const identityFilters = [
    // Full name
    uniqueIdentityFilter,

    // First name
    {
        filterName: "firstName",
        filterFn: (clientNpc) => (npc) => npc.identity.firstName === clientNpc.identity.firstName,
        textsFn: [
            (clientNpc) => `His first name is ${ clientNpc.identity.firstName }.`
        ]
    },
    {
        filterName: "firstNameStartsWith",
        filterFn: (clientNpc) => (npc) => npc.identity.firstName.startsWith(clientNpc.identity.firstName[0]),
        textsFn: [
            (clientNpc) => `His first name starts with ${ clientNpc.identity.firstName[0] }.`
        ]
    },

    // Last name
    {
        filterName: "lastName",
        filterFn: (clientNpc) => (npc) => npc.identity.lastName === clientNpc.identity.lastName,
        textsFn: [
            (clientNpc) => `His last name is ${ clientNpc.identity.lastName }.`
        ]
    },
    {
        filterName: "lastNameStartsWith",
        filterFn: (clientNpc) => (npc) => npc.identity.lastName.startsWith(clientNpc.identity.lastName[0]),
        textsFn: [
            (clientNpc) => `His last name starts with ${ clientNpc.identity.lastName[0] }.`
        ]
    },

    // Birth Date
    {
        filterName: "birthDate",
        filterFn: (clientNpc) => (npc) => npc.identity.birthDate === clientNpc.identity.birthDate,
        textsFn: [
            (clientNpc) => `He was born on ${ toReadableDate(clientNpc.identity.birthDate) }.`
        ]
    },
    {
        filterName: "birthDateYear",
        filterFn: (clientNpc) => (npc) => npc.identity.birthDate.getFullYear() === clientNpc.identity.birthDate.getFullYear(),
        textsFn: [
            (clientNpc) => `He was born in ${ clientNpc.identity.birthDate.getFullYear() }.`
        ]
    },
    {
        filterName: "birthDateMonth",
        filterFn: (clientNpc) => (npc) => npc.identity.birthDate.getMonth() === clientNpc.identity.birthDate.getMonth(),
        textsFn: [
            (clientNpc) => `He is born in ${ toReadableMonth(clientNpc.identity.birthDate) }.`
        ]
    },
    {
        filterName: "birthDateDayOfMonth",
        filterFn: (clientNpc) => (npc) => npc.identity.birthDate.getDate() === clientNpc.identity.birthDate.getDate(),
        textsFn: [
            (clientNpc) => `He was born on the ${ clientNpc.identity.birthDate.getDate() } day of the month.`
        ]
    },

    // Age
    {
        filterName: "age",
        filterFn: (clientNpc) => (npc) => getAge(npc.identity.birthDate) === getAge(clientNpc.identity.birthDate),
        textsFn: [
            (clientNpc) => `He is ${ getAge(clientNpc.identity.birthDate) } years old.`
        ]
    },
    // TODO : ageBetween: (min, max) => (npc) => betweenInclusive(getAge(npc.identity.birthDate), min, max),
    // TODO : ageOlderThan: (min) => (npc) => getAge(npc.identity.birthDate) > min,
    // TODO : ageYoungerThan: (max) => (npc) => getAge(npc.identity.birthDate) < max,

    // Country
    {
        filterName: "country",
        filterFn: (clientNpc) => (npc) => npc.identity.country === clientNpc.identity.country,
        textsFn: [
            (clientNpc) => `He comes from ${ clientNpc.identity.country }.`
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

    // Age category
    {
        filterName: "characterAgeCategory",
        filterFn: (clientNpc) => (npc) => npc.identity.character.ageCategory === clientNpc.identity.character.ageCategory,
        textsFn: [
            (clientNpc) => `His is ${ toReadableAgeCategory(clientNpc.identity.character.ageCategory) }.`
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
    {
        filterName: "characterOutfitType",
        filterFn: (clientNpc) => (npc) => npc.identity.character.outfit?.type === clientNpc.identity.character.outfit?.type,
        textsFn: [
            (clientNpc) => `He has ${ toReadableOutfitType(clientNpc.identity.character.outfit?.type) }.`
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
    {
        filterName: "characterOutfitHatColor",
        filterFn: (clientNpc) => (npc) => npc.identity.character.outfit.hat?.color === clientNpc.identity.character.outfit.hat?.color,
        textsFn: [
            (clientNpc) => clientNpc.identity.character.outfit.hat?.color ?
                `His hat is ${ clientNpc.identity.character.outfit.hat.color }.`
                : `He has ${ toReadableHatType(null) }.`
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
]
