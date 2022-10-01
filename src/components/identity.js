import {toReadableDate} from "../utils/readable.js";

export function identity(firstName, lastName, birthDate, country, character) {

    return {
        id: 'identity',
        identity: {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            country: country,
            character: character
        },
        presentation() {
            return `Hi! I'm ${this.identity.firstName} ${this.identity.lastName}. I was born on ${ toReadableDate(this.identity.birthDate) } in ${ country }.`
        }
    }

}