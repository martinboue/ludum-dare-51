import greetings from "../data/greetings";

export function identity(name, character) {

    return {
        id: 'identity',
        identity: {
            name: name,
            character: character,
            greeting: greetings.pickRandom().replace("{name}", name)
        }
    };

}