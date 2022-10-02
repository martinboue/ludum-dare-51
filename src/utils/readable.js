
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