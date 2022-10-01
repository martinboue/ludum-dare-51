import dayjs from "dayjs";

export function toReadableAgeCategory(ageCategory) {
    switch (ageCategory) {
        case "adult": return "an adult";
        case "old": return "an elderly person"
        default:
            console.warn(`The age category '${ageCategory}' has no readable value.`)
            return ageCategory;
    }
}

export function toReadableOutfitType(outfitType) {
    switch (outfitType) {
        case undefined:
        case null:
            return "a classic outfit"
        case "builder": return "a construction outfit"
        default:
            console.warn(`The outfit type '${outfitType}' has no readable value.`)
            return outfitType
    }
}

export function toReadableHatType(hatType) {
    switch (hatType) {
        case null:
        case undefined:
            return "no hat"
        case "helmet": return "a helmet"
        case "headband": return "a headband"
        default:
            console.warn(`The hat type '${hatType}' has no readable value.`)
            return hatType
    }
}

export function toReadableDate(date) {
    return dayjs(date).format("D MMMM YYYY")
}

export function toReadableMonth(date) {
    return dayjs(date).format("MMMM")
}