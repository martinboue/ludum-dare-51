import greetings from "../data/greetings";

export function identity(name, skin) {

    return {
        id: 'identity',
        identity: {
            name: name,
            skin: skin,
            greeting: greetings.pickRandom().replaceAll("{name}", "[" + name + "].red")
        }
    };

}